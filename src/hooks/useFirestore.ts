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
import { Project, GalleryItem, SiteSettings } from '@/types/admin';

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
      setProjects(projectsData);
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
