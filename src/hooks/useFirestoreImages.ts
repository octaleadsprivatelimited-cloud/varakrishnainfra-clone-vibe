/**
 * Images for Firestore database only (no Firebase Storage).
 * Prepares image files as base64 strings to be stored in Firestore document fields
 * (e.g. project.images[], gallery item url). Actual save is in useFirestore (addDoc/updateDoc).
 */
import { useState } from 'react';

interface UploadResult {
  url: string;
  path: string;
}

// Target max dimension (longest side) and Firestore doc size limit
const MAX_DIMENSION = 1200;
const MAX_SIZE_BYTES = 650000; // Under 1MB Firestore doc limit, leave room for other fields

/** Resize and compress image so it fits in Firestore and displays well */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width >= height) {
            height = (height * MAX_DIMENSION) / width;
            width = MAX_DIMENSION;
          } else {
            width = (width * MAX_DIMENSION) / height;
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const tryQuality = (quality: number): string =>
          canvas.toDataURL('image/jpeg', quality);
        const toSize = (base64: string) => (base64.length * 3) / 4;
        const qualities = [0.82, 0.65, 0.5, 0.4, 0.35];
        let base64 = tryQuality(qualities[0]);
        for (let i = 1; i < qualities.length && toSize(base64) > MAX_SIZE_BYTES; i++) {
          base64 = tryQuality(qualities[i]);
        }
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Prepares images to store in Firestore database (as base64 in document fields). */
export const useFirestoreImages = () => {
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
      const base64 = await compressImage(file);
      setProgress(100);
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const path = `${folder}/${timestamp}_${safeName}`;
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
    setProgress(0);
    const results: UploadResult[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const base64 = await compressImage(files[i]);
        const timestamp = Date.now();
        const safeName = files[i].name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const path = `${folder}/${timestamp}_${safeName}`;
        results.push({ url: base64, path });
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      return results;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (_path: string): Promise<void> => {
    // Image is in Firestore doc; remove the field when you update the document
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
    progress
  };
};
