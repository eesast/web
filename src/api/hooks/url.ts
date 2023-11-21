import { useLocation } from "react-router-dom";

export class Url {
  site: string;
  page: string;
  query: URLSearchParams;

  constructor(site: string, page: string, query: URLSearchParams) {
    this.site = site;
    this.page = page;
    this.query = query;
  }

  link(end: string = this.page, mode: string = "page"): string {
    if (mode === "site") {
      return "/" + end + "?" + this.query.toString();
    }
    return "/" + this.site + "/" + end + "?" + this.query.toString();
  }

  append(key: string, value: any): Url {
    const query = new URLSearchParams(this.query);
    while (query.has(key)) {
      query.delete(key);
    }
    query.append(key, value);
    return new Url(this.site, this.page, query);
  }

  delete(key: string): Url {
    const query = new URLSearchParams(this.query);
    query.delete(key);
    return new Url(this.site, this.page, query);
  }
}

export const useUrl = (): Url => {
  const location = useLocation();
  const url = new Url(
    location.pathname.split("/")[1],
    location.pathname.split("/")[2],
    new URLSearchParams(location.search),
  );
  return url;
};
