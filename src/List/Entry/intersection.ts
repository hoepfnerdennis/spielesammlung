import { useRef, useEffect, useState, useCallback } from 'react';

const useIntersection = (
  nodeRef: React.RefObject<HTMLElement>,
  triggerOnce = false,
  observerOptions?: IntersectionObserverInit
): [boolean] => {
  const observerRef = useRef<IntersectionObserver | undefined>();
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  // check for IntersectionObserver available
  if (typeof IntersectionObserver === 'undefined') {
    if (!isIntersecting) {
      setIsIntersecting(true);
    }
  }

  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // the first element is the element to observe
      if (entry && entry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce) {
          observer.unobserve(entry.target);
        }
      } else {
        setIsIntersecting(false);
      }
    },
    [triggerOnce]
  );

  // create new observer on mount and cleanup on unmount
  useEffect(() => {
    const currentNode = nodeRef.current;

    if (IntersectionObserver && currentNode) {
      observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
      observerRef.current.observe(currentNode);
    }

    return (): void => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = undefined;
      }
    };
  }, [nodeRef, observerCallback, observerOptions]);

  return [isIntersecting];
};

export default useIntersection;
