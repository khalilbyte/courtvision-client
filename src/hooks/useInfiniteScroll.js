import { useEffect, useCallback } from "react";

export const useInfiniteScroll = (callback, loading) => {
  const handleScroll = useCallback(() => {
    if (loading) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      callback();
    }
  }, [callback, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};
