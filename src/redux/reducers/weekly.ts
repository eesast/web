import { IWeeklyAction } from "../types/actions";
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
import { IWeeklyState } from "../types/state";

export default function weekly(
  state: IWeeklyState = {
    currentArticle: {
      status: undefined,
      fetching: false,
      item: {
        id: 0,
        title: "",
        alias: "",
        author: "",
        authorId: 0,
        abstract: "一个简短的介绍文章内容的摘要",
        image: "",
        content: "No Article",
        views: 0,
        likers: [],
        tags: [],
        createdAt: ""
      }
    },
    articles: {
      fetching: false,
      hasMore: false,
      items: []
    },
    comments: {
      fetching: false,
      items: []
    }
  },
  action: IWeeklyAction
): IWeeklyState {
  switch (action.type) {
    case GET_ARTICLE_FEEDS_REQUEST:
      return {
        ...state,
        articles: {
          ...state.articles,
          fetching: true,
          error: null
        }
      };
    case GET_ARTICLE_FEEDS_SUCCESS:
      const newArticles = action.payload.articles;
      const pageSize = action.payload.pageSize;

      return {
        ...state,
        articles: {
          ...state.articles,
          fetching: false,
          hasMore: newArticles.length === pageSize,
          items: [...state.articles.items, ...newArticles]
        }
      };
    case GET_ARTICLE_FEEDS_FAILURE:
      return {
        ...state,
        articles: {
          ...state.articles,
          fetching: false,
          error: action.payload
        }
      };

    case GET_ARTICLE_REQUEST: {
      return {
        ...state,
        currentArticle: {
          ...state.currentArticle,
          fetching: true,
          error: null
        }
      };
    }
    case GET_ARTICLE_SUCCESS: {
      const article = action.payload.article;
      const status = action.payload.status;
      return {
        ...state,
        currentArticle: {
          status: status,
          item: article,
          fetching: false,
          error: null
        }
      };
    }
    case GET_ARTICLE_FAILURE: {
      return {
        ...state,
        currentArticle: {
          ...state.currentArticle,
          fetching: false,
          error: action.payload
        }
      };
    }

    case GET_ARTICLE_BY_ALIAS_REQUEST: {
      return {
        ...state,
        currentArticle: {
          ...state.currentArticle,
          fetching: true,
          error: null
        }
      };
    }
    case GET_ARTICLE_BY_ALIAS_SUCCESS: {
      const article = action.payload.article;
      const status = action.payload.status;
      return {
        ...state,
        currentArticle: {
          status: status,
          item: article,
          fetching: false,
          error: null
        }
      };
    }
    case GET_ARTICLE_BY_ALIAS_FAILURE: {
      return {
        ...state,
        currentArticle: {
          ...state.currentArticle,
          fetching: false,
          error: action.payload
        }
      };
    }
  }
  return state;
}
