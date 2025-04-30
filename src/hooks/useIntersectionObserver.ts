import {useEffect, useRef} from 'react';

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = (
  callback: Callback,
  options?: ObserverOptions,
) => {
  const tagetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (tagetRef.current) {
      observer.observe(tagetRef.current);
    }

    return () => {
      if (tagetRef.current) {
        observer.unobserve(tagetRef.current);
      }
    };
  }, []);

  return tagetRef;
};
