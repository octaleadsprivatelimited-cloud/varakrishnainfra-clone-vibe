import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';

interface UploadResult {
  url: string;
  path: string;
}

export const useFirebaseStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: File,
    folder: 'projects' | 'gallery' | 'floor-plans'
  ): Promise<UploadResult> => {
    setUploading(true);
    setProgress(0);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const path = `${folder}/${timestamp}_${safeName}`;
      const storageRef = ref(storage, path);

      // Upload the file
      await uploadBytes(storageRef, file);
      setProgress(100);

      // Get the download URL
      const url = await getDownloadURL(storageRef);

      return { url, path };
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleFiles = async (
    files: File[],
    folder: 'projects' | 'gallery' | 'floor-plans'
  ): Promise<UploadResult[]> => {
    setUploading(true);
    const results: UploadResult[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const result = await uploadFile(files[i], folder);
        results.push(result);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      return results;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (path: string): Promise<void> => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
    progress
  };
};
