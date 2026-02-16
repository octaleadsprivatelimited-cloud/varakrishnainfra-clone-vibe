import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDoc,
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, GalleryItem, SiteSettings, Enquiry } from '@/types/admin';
import { demoProjects } from '@/data/demoProjects';

// Projects Hook
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always include demo projects
    const demoData = demoProjects.map(p => ({
      ...p,
      createdAt: new Date(),
      updatedAt: new Date()
    })) as Project[];

    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate(),
        updatedAt: d.data().updatedAt?.toDate()
      })) as Project[];
      
      // Combine Firebase projects with demo projects
      setProjects([...projectsData, ...demoData]);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      // Fallback to demo projects on error
      setProjects(demoData);
      setLoading(false);
    });

    return unsubscribe;
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

// Gallery Hook
export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate()
      })) as GalleryItem[];
      setGalleryItems(items);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching gallery:', error);
      setGalleryItems([]);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, 'gallery'), {
      ...item,
      createdAt: Timestamp.now()
    });
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
      const data = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate()
      })) as Enquiry[];
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
