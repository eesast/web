import axios from "axios";
import { IArticle } from "../redux/types/state";
import api from ".";

export const getArticleFeeds = async (begin: number, end: number) => {
  const response = await axios.get(
    `/v1/articles?begin=${begin}&end=${end}&noContent=true`
  );
  return response.data as IArticle[];
};

export const getArticle = async (articleId: number) => {
  const response = await axios.get(`/v1/articles/${articleId}`);
  return response.data as IArticle;
};

export const getArticleByAlias = async (alias: string) => {
  const response = await axios.get(`/v1/articles?alias=${alias}`);
  let article = response.data[0] as IArticle;
  article.author = await api.getUsername(article.authorId);
  return article;
};

export const getSelfArticles = async (
  userId: number,
  visible: boolean,
  begin?: number,
  end?: number
) => {
  if (!begin && !end) {
    const response = await axios.get(
      `/v1/articles?authorId=${userId}&invisible=${visible}`
    );
    return response.data as IArticle[];
  } else {
    const response = await axios.get(
      `/v1/articles?authorId=${userId}&invisible=${!visible}&begin=${begin}&end=${end}`
    );

    return response.data as IArticle[];
  }
};

export const getSelfArticleNum = async (userId: number, visible: boolean) => {
  const response = await axios.get(
    `/v1/articles?authorId=${userId}&invisible=${!visible}&count=true`
  );
  return response.data.num as number;
};

export const getPostedArticles = async (userId: number) => {
  const response = await axios.get(`/v1/articles?createdBy=${userId}`);
  return response.data as IArticle[];
};

export const getUnderReviewArticles = async (begin?: number, end?: number) => {
  const response = await axios.get(
    `/v1/articles?invisible=true&tag=underReview&begin=${begin}&end=${end}`
  );
  return response.data as IArticle[];
};

export const getUnderReviewArticlesNum = async () => {
  const response = await axios.get(`/v1/articles?invisible=true&count=true`);
  return response.data.num as number;
};

export const postArticle = async (form: Partial<IArticle>) => {
  const response = await axios.post(`v1/articles`, form);
  return response.data as string;
};

export const updateArticle = async (id: number, form: Partial<IArticle>) => {
  const response = await axios.put(`/v1/articles/${id}`, form);
  return response.data as string;
};

export const updateArticleVisibility = async (id: number, visible: boolean) => {
  const response = await axios.put(`/v1/articles/${id}`, {
    visible: visible,
  });
  return response.data as string;
};

export const deleteArticle = async (articleId: number) => {
  const response = await axios.delete(`/v1/articles/${articleId}`);
  return response.statusText;
};

export const likeArticle = async (articleId: number) => {
  const response = await axios.get(`/v1/articles/${articleId}/like`);
  return response.data;
};

export const unlikeArticle = async (articleId: number) => {
  const response = await axios.get(`/v1/articles/${articleId}/unlike`);
  return response.data;
};
