import { useState } from 'react';

interface UploadResult {
  url: string;
  path: string;
}

// Compress and convert image to base64
const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down if needed
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const base64 = canvas.toDataURL('image/jpeg', quality);
        
        // Check size (Firestore doc limit is 1MB, leave room for other fields)
        const sizeInBytes = (base64.length * 3) / 4;
        if (sizeInBytes > 700000) {
          // Try with more compression
          const smallerBase64 = canvas.toDataURL('image/jpeg', 0.4);
          resolve(smallerBase64);
        } else {
          resolve(base64);
        }
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const useFirestoreStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: File,
    folder: 'projects' | 'gallery' | 'floor-plans'
  ): Promise<UploadResult> => {
    setUploading(true);
    setProgress(0);

    try {
      setProgress(30);
      
      // Compress and convert to base64
      const base64 = await compressImage(file);
      
      setProgress(100);
      
      // Create a unique identifier
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const path = `${folder}/${timestamp}_${safeName}`;

      // Return base64 as the URL (stored directly in Firestore document)
      return { url: base64, path };
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
    // No-op for base64 - file is deleted when document is updated
    console.log('File reference removed:', path);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
    progress
  };
};
