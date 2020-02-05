import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import {
  IGetArticleFeedsAction,
  IGetArticleAction,
  IGetArticleByAliasAction,
  IThunkResult
} from "../types/actions";
import {
  GET_ARTICLE_FEEDS_FAILURE,
  GET_ARTICLE_FEEDS_REQUEST,
  GET_ARTICLE_FEEDS_SUCCESS,
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE,
  GET_ARTICLE_BY_ALIAS_REQUEST,
  GET_ARTICLE_BY_ALIAS_SUCCESS,
  GET_ARTICLE_BY_ALIAS_FAILURE
} from "../types/constants";
import { IArticle } from "../types/state";

export const getArticleFeedsAction = createAsyncAction(
  GET_ARTICLE_FEEDS_REQUEST,
  GET_ARTICLE_FEEDS_SUCCESS,
  GET_ARTICLE_FEEDS_FAILURE
)<undefined, { articles: IArticle[]; pageSize: number }, Error>();

export function getArticleFeeds(
  page: number,
  pageSize: number
): IThunkResult<IGetArticleFeedsAction> {
  return async dispatch => {
    dispatch(getArticleFeedsAction.request());

    try {
      const articles = await api.getArticleFeeds(
        page * pageSize,
        (page + 1) * pageSize - 1
      );
      dispatch(getArticleFeedsAction.success({ articles, pageSize }));
    } catch (e) {
      dispatch(getArticleFeedsAction.failure(e));
    }
  };
}

export const getArticleAction = createAsyncAction(
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAILURE
)<undefined, IArticle, Error>();

export function getArticle(articleId: number): IThunkResult<IGetArticleAction> {
  return async dispatch => {
    dispatch(getArticleAction.request());

    try {
      const article = await api.getArticle(articleId);
      dispatch(getArticleAction.success(article));
    } catch (e) {
      dispatch(getArticleAction.failure(e));
    }
  };
}

export const getArticleByAliasAction = createAsyncAction(
  GET_ARTICLE_BY_ALIAS_REQUEST,
  GET_ARTICLE_BY_ALIAS_SUCCESS,
  GET_ARTICLE_BY_ALIAS_FAILURE
)<undefined, IArticle, Error>();

export function getArticleByAlias(
  alias: string
): IThunkResult<IGetArticleByAliasAction> {
  return async dispatch => {
    dispatch(getArticleByAliasAction.request());

    try {
      const article = await api.getArticleByAlias(alias);
      dispatch(getArticleByAliasAction.success(article));
    } catch (e) {
      dispatch(getArticleByAliasAction.failure(e));
    }
  };
}
