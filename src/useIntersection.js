import React from "react";

// Custom Hook used for IntersectionObserver
export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 0.4,
  rootMargin = "50%",
  enabled = true
}) {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}
