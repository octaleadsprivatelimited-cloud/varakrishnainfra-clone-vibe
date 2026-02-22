import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDoc,
  getDocs,
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import type { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, GalleryItem, SiteSettings, Enquiry } from '@/types/admin';

const PROJECTS_PAGE_SIZE = 50;

function mapProjectDoc(d: QueryDocumentSnapshot): Project {
  const data = d.data();
  const toDate = (v: unknown) =>
    v && typeof (v as { toDate?: () => Date }).toDate === 'function'
      ? (v as { toDate: () => Date }).toDate()
      : new Date();
  return {
    id: d.id,
    ...data,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt)
  } as Project;
}

// Projects Hook – only Firebase projects; paginated fetch + listener so new adds show
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sortByNewest = (list: Project[]) =>
      [...list].sort((a, b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0));

    const fetchAll = async () => {
      const allFirebase: Project[] = [];
      let lastDoc: DocumentSnapshot | null = null;
      const coll = collection(db, 'projects');
      try {
        do {
          const q = lastDoc
            ? query(coll, limit(PROJECTS_PAGE_SIZE), startAfter(lastDoc))
            : query(coll, limit(PROJECTS_PAGE_SIZE));
          const snapshot = await getDocs(q);
          snapshot.docs.forEach(d => allFirebase.push(mapProjectDoc(d)));
          if (snapshot.docs.length < PROJECTS_PAGE_SIZE) break;
          lastDoc = snapshot.docs[snapshot.docs.length - 1];
        } while (true);
        return sortByNewest(allFirebase);
      } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
      }
    };

    let cancelled = false;
    (async () => {
      const list = await fetchAll();
      if (!cancelled) setProjects(list);
      if (!cancelled) setLoading(false);
    })();

    const unsub = onSnapshot(collection(db, 'projects'), () => {
      if (cancelled) return;
      fetchAll().then(list => { if (!cancelled) setProjects(list); });
    }, () => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  const addProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Remove undefined values before sending to Firebase (Firebase doesn't accept undefined)
      const cleanProject = Object.fromEntries(
        Object.entries(project).filter(([_, v]) => v !== undefined)
      ) as any;
      
      // Clean nested objects
      if (cleanProject.specifications) {
        cleanProject.specifications = Object.fromEntries(
          Object.entries(cleanProject.specifications).filter(([_, v]) => v !== undefined)
        );
      }
      
      await addDoc(collection(db, 'projects'), {
        ...cleanProject,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    } catch (error: any) {
      console.error('Error adding project to Firebase:', error);
      throw new Error(error?.message || 'Failed to add project. Please check Firebase permissions and connection.');
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      // Remove undefined values before sending to Firebase (Firebase doesn't accept undefined)
      const cleanProject = Object.fromEntries(
        Object.entries(project).filter(([_, v]) => v !== undefined)
      ) as any;
      
      // Clean nested objects
      if (cleanProject.specifications) {
        cleanProject.specifications = Object.fromEntries(
          Object.entries(cleanProject.specifications).filter(([_, v]) => v !== undefined)
        );
      }
      
      await updateDoc(doc(db, 'projects', id), {
        ...cleanProject,
        updatedAt: Timestamp.now()
      });
    } catch (error: any) {
      console.error('Error updating project in Firebase:', error);
      throw new Error(error?.message || 'Failed to update project. Please check Firebase permissions and connection.');
    }
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  return { projects, loading, addProject, updateProject, deleteProject };
};

const GALLERY_PAGE_SIZE = 30;

function mapGalleryDoc(d: QueryDocumentSnapshot): GalleryItem | null {
  try {
    const data = d.data();
    const rawCreated = data.createdAt;
    let createdAt: Date;
    if (rawCreated && typeof (rawCreated as { toDate?: () => Date }).toDate === 'function') {
      createdAt = (rawCreated as { toDate: () => Date }).toDate();
    } else if (rawCreated instanceof Date) {
      createdAt = rawCreated;
    } else {
      createdAt = new Date();
    }
    const url = data.url;
    const urlStr = typeof url === 'string' ? url : (url != null ? String(url) : '');
    if (!urlStr || urlStr.length < 10) return null;
    return {
      id: d.id,
      type: (data.type ?? 'image') as GalleryItem['type'],
      url: urlStr,
      youtubeId: data.youtubeId != null ? String(data.youtubeId) : undefined,
      title: String(data.title ?? ''),
      category: String(data.category ?? ''),
      createdAt
    } as GalleryItem;
  } catch {
    return null;
  }
}

// Gallery Hook – fetches gallery docs in pages, rendering progressively
export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coll = collection(db, 'gallery');
    const sortByNewest = (items: GalleryItem[]) =>
      [...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    let cancelled = false;
    (async () => {
      const allItems: GalleryItem[] = [];
      let lastDoc: DocumentSnapshot | null = null;
      try {
        do {
          const q = lastDoc
            ? query(coll, limit(GALLERY_PAGE_SIZE), startAfter(lastDoc))
            : query(coll, limit(GALLERY_PAGE_SIZE));
          const snapshot = await getDocs(q);
          snapshot.docs.forEach(d => {
            const item = mapGalleryDoc(d);
            if (item) allItems.push(item);
          });
          // Show items progressively after each batch
          if (!cancelled) setGalleryItems(sortByNewest([...allItems]));
          if (!cancelled && loading) setLoading(false);
          if (snapshot.docs.length < GALLERY_PAGE_SIZE) break;
          lastDoc = snapshot.docs[snapshot.docs.length - 1];
          // Yield to UI thread between batches
          await new Promise(r => setTimeout(r, 10));
        } while (!cancelled);
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching gallery:', error);
          if (allItems.length === 0) setGalleryItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const payload: Record<string, unknown> = {
      type: item.type,
      url: item.url,
      title: item.title,
      category: item.category,
      createdAt: Timestamp.now()
    };
    if (item.type === 'video' && item.youtubeId != null) payload.youtubeId = item.youtubeId;
    Object.keys(payload).forEach(k => { if (payload[k] === undefined) delete payload[k]; });
    try {
      await addDoc(collection(db, 'gallery'), payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message.includes('permission') ? 'Not allowed. Make sure you are logged in as admin.' : message);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
  };

  return { galleryItems, loading, addGalleryItem, deleteGalleryItem };
};

// Site Settings Hook
export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'settings', 'site');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings({
          id: snapshot.id,
          ...snapshot.data(),
          updatedAt: snapshot.data().updatedAt?.toDate()
        } as SiteSettings);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching site settings:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateSocialLinks = async (socialLinks: Partial<SiteSettings['socialLinks']>) => {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        socialLinks: { ...docSnap.data().socialLinks, ...socialLinks },
        updatedAt: Timestamp.now()
      });
    } else {
      await setDoc(doc(db, 'settings', 'site'), {
        socialLinks,
        updatedAt: Timestamp.now()
      });
    }
  };

  return { settings, loading, updateSocialLinks };
};

// Enquiries Hook
export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => {
        const raw = d.data();
        return {
          id: d.id,
          projectId: String(raw.projectId ?? ''),
          projectTitle: String(raw.projectTitle ?? ''),
          name: String(raw.name ?? ''),
          email: String(raw.email ?? ''),
          phone: String(raw.phone ?? ''),
          message: String(raw.message ?? ''),
          status: (raw.status ?? 'new') as Enquiry['status'],
          createdAt: raw.createdAt?.toDate?.() ?? new Date(),
        } satisfies Enquiry;
      });
      setEnquiries(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching enquiries:', error);
      setEnquiries([]);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    await addDoc(collection(db, 'enquiries'), {
      ...enquiry,
      status: 'new',
      createdAt: Timestamp.now()
    });
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    await updateDoc(doc(db, 'enquiries', id), { status });
  };

  const deleteEnquiry = async (id: string) => {
    await deleteDoc(doc(db, 'enquiries', id));
  };

  return { enquiries, loading, addEnquiry, updateEnquiryStatus, deleteEnquiry };
};

// Submit enquiry (for public use - doesn't require auth)
export const submitEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
  await addDoc(collection(db, 'enquiries'), {
    ...enquiry,
    status: 'new',
    createdAt: Timestamp.now()
  });
};
