import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
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
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Project[];
      
      // Use demo projects if Firebase is empty
      if (projectsData.length === 0) {
        const demoData = demoProjects.map(p => ({
          ...p,
          createdAt: new Date(),
          updatedAt: new Date()
        })) as Project[];
        setProjects(demoData);
      } else {
        setProjects(projectsData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      // Fallback to demo projects on error
      const demoData = demoProjects.map(p => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date()
      })) as Project[];
      setProjects(demoData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    await updateDoc(doc(db, 'projects', id), {
      ...project,
      updatedAt: Timestamp.now()
    });
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
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as GalleryItem[];
      setGalleryItems(items);
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
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site'), (doc) => {
      if (doc.exists()) {
        setSettings({
          id: doc.id,
          ...doc.data(),
          updatedAt: doc.data().updatedAt?.toDate()
        } as SiteSettings);
      }
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
      await addDoc(collection(db, 'settings'), {
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
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Enquiry[];
      setEnquiries(data);
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
