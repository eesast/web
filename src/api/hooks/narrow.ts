import { useEffect, useState } from "react";

/**
 * 视口是否窄于断点。
 * 只在真正跨过断点时触发一次重渲染，
 * 避免手机地址栏收起/展开引起的 resize 风暴把整页重绘。
 */
export const useNarrow = (query = "(max-width: 768px)") => {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setNarrow(e.matches);

    setNarrow(mql.matches);
    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return narrow;
};
