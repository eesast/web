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
  article.author = await (await api.getUserInfo(article.authorId)).username;
  return article;
};

export const postArticle = async (
  title: string,
  alias: string,
  authorId: number,
  content: string,
  abstract: string,
  image: string,
  tags: string[]
) => {
  const response = await axios.post(`v1/articles`, {
    title,
    alias,
    authorId,
    content,
    abstract,
    image,
    tags
  });
  return response.data as string;
};

export const updateArticle = async (
  articleId: number,
  title: string,
  alias: string,
  authorId: number,
  content: string,
  abstract: string,
  image: string,
  tags: string[]
) => {
  const response = await axios.put(`/v1/articles/${articleId}`, {
    title,
    alias,
    authorId,
    content,
    abstract,
    image,
    tags
  });
  return response.data as string;
};

export const likeArticle = async (articleId: number) => {
  const response = await axios.get(`/v1/articles/${articleId}/like`);
  return response.data;
};

export const unlikeArticle = async (articleId: number) => {
  const response = await axios.get(`/v1/articles/${articleId}/unlike`);
  return response.data;
};
