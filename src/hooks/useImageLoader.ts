import { useState, useEffect } from "react";

export function useImageLoader(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setError(true);
    };

    // If image is already cached
    if (img.complete) {
      setIsLoaded(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, error };
}

export function useMultipleImageLoader(sources: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    setLoadedCount(0);
    setAllLoaded(false);

    let mounted = true;
    let loaded = 0;

    sources.forEach((src) => {
      const img = new Image();
      img.src = src;

      const handleLoad = () => {
        if (!mounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === sources.length) {
          setAllLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad; // Count errors as "loaded" to not block

      if (img.complete) {
        handleLoad();
      }
    });

    return () => {
      mounted = false;
    };
  }, [sources]);

  return { loadedCount, allLoaded, progress: sources.length ? loadedCount / sources.length : 0 };
}
