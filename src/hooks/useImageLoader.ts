import { useState, useEffect } from "react";

export function useImageLoader(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, error };
}

export function useMultipleImageLoader(sources: string[]) {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!sources || sources.length === 0) {
      setAllLoaded(true);
      return;
    }

    setAllLoaded(false);
    let mounted = true;
    let loaded = 0;

    sources.forEach((src) => {
      const img = new Image();

      const handleLoad = () => {
        if (!mounted) return;
        loaded++;
        if (loaded >= sources.length) {
          setAllLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
      img.src = src;
    });

    return () => {
      mounted = false;
    };
  }, [sources.join(',')]);

  return { allLoaded, loadedCount: 0, progress: 0 };
}
