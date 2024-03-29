import React, { useRef } from "react";
import useIntersectionObserver from "./useIntersection";

const InfiniteScroller = ({ children, hasMore, loadMore, ...otherProps }) => {
  const ref = useRef();
  useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore,
    target: ref
  });
  return (
    <div {...otherProps}>
      {children}
      <div
        className="target"
        style={{ padding: "20px", visibility: "none" }}
        ref={ref}
        id="lala"
      />
    </div>
  );
};

export default InfiniteScroller;
