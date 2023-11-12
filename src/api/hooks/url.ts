import { useLocation } from "react-router-dom";

interface Url {
  site: string;
  page: string;
  query: URLSearchParams;
  link: (end?: string, mode?: string) => string;
  route: (end?: string, mode?: string) => string;
  append: (key: string, value: any) => string;
  delete: (key: string) => string;
}

export const useUrl = (): Url => {
  const location = useLocation();
  const url: Url = {
    site: location.pathname.split("/")[1],
    page: location.pathname.split("/")[2],
    query: new URLSearchParams(location.search),
    link: (end = "", mode = "page") => {
      if (mode === "site") {
        return "/" + end + location.search;
      }
      return "/" + url.site + "/" + end + location.search;
    },
    route: (end = "", mode = "page") => {
      if (mode === "site") {
        return "/" + end;
      }
      return "/" + url.site + "/" + end;
    },
    append: (key, value) => {
      const query = new URLSearchParams(location.search);
      query.append(key, value);
      return location.pathname + "?" + query.toString();
    },
    delete: (key) => {
      const query = new URLSearchParams(location.search);
      if (query.has(key)) query.delete(key);
      return location.pathname + "?" + query.toString();
    },
  };
  return url;
};
