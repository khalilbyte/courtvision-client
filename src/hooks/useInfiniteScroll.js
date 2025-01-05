import { useEffect, useRef } from "react";

export default function useInfiniteScroll(onLoadMore, isLoading) {
  const scrollPositionRef = useRef(0);
  const isNearBottomRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const nearBottom = windowHeight + scrollTop >= documentHeight - 100;

      if (nearBottom && !isNearBottomRef.current && !isLoading) {
        isNearBottomRef.current = true;
        onLoadMore();
      } else if (!nearBottom) {
        isNearBottomRef.current = false;
      }
    };

    const restorePosition = () => {
      if (scrollPositionRef.current > 0) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.addEventListener("scroll", handleScroll);
    const observer = new MutationObserver(restorePosition);

    const targetNode = document.querySelector(".grid");
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();

      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, [onLoadMore, isLoading]);
}
