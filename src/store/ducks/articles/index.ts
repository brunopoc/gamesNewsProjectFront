import { Reducer } from 'redux';

export enum actionArticleTypes {
  ARTICLE_REQUEST = '@ARTICLE_/ARTICLE_REQUEST',
  ARTICLE_SUCCESS = '@ARTICLE_/ARTICLE_SUCCESS',
  ARTICLE_FAILURE = '@ARTICLE_/ARTICLE_FAILURE',
  ARTICLE_LIST_REQUEST = '@ARTICLE_/ARTICLE_LIST_REQUEST',
  ARTICLE_LIST_SUCCESS = '@ARTICLE_/ARTICLE_LIST_SUCCESS',
  LOAD_ARTICLE_REQUEST = '@ARTICLE_/LOAD_ARTICLE_REQUEST',
  LOAD_ARTICLE_SUCCESS = '@ARTICLE_/LOAD_ARTICLE_SUCCESS',
  ARTICLE_UPDATE_LIKE_REQUEST = '@ARTICLE_/ARTICLE_UPDATE_LIKE_REQUEST',
  ARTICLE_COMMENT_REQUEST = '@ARTICLE_/ARTICLE_UPDATE_COMMENT_REQUEST',
}

type Author = {
  name: string;
};

type CommentAuthor = {
  name: string;
  id: string;
};

export type Answare = {
  _id?: string;
  text: string;
  commentedAt: Date;
  author: CommentAuthor;
};

export type Comment = {
  _id?: string;
  text: string;
  commentedAt?: Date;
  author: CommentAuthor;
  answares?: Answare[];
};

export interface Article {
  title: string;
  content: string;
  _id: string;
  image?: string;
  createdAt: Date;
  resume?: string;
  author?: Author;
  likes?: number;
  comments?: Comment[];
  refer: string;
}

export interface ArticleState {
  readonly list: Article[];
  readonly totalOfPages: number;
  readonly currentPage: number;
  readonly currentArticle?: Article;
}

export const ActionsList = {
  articleRequest: (data: Article) => {
    return { type: actionArticleTypes.ARTICLE_REQUEST, payload: { data } };
  },
  articleSuccess: () => {
    return { type: actionArticleTypes.ARTICLE_SUCCESS };
  },
  articleFailure: () => {
    return { type: actionArticleTypes.ARTICLE_FAILURE };
  },
  articleListRequest: (page: number) => {
    return { type: actionArticleTypes.ARTICLE_LIST_REQUEST, payload: { page } };
  },
  articleListSuccess: (data: ArticleState) => {
    return { type: actionArticleTypes.ARTICLE_LIST_SUCCESS, payload: { data } };
  },
  loadArticleRequest: (refer: string) => {
    return { type: actionArticleTypes.LOAD_ARTICLE_REQUEST, payload: { refer } };
  },
  loadArticleSuccess: (data: Article) => {
    return { type: actionArticleTypes.LOAD_ARTICLE_SUCCESS, payload: { data } };
  },
  updateLikeRequest: data => {
    return { type: actionArticleTypes.ARTICLE_UPDATE_LIKE_REQUEST, payload: { data } };
  },
  articleCommentRequest: data => {
    return { type: actionArticleTypes.ARTICLE_COMMENT_REQUEST, payload: { data } };
  },
};

const INITIAL_STATE: ArticleState = {
  list: [],
  totalOfPages: 1,
  currentPage: 1,
};

const reducer: Reducer<ArticleState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionArticleTypes.ARTICLE_LIST_SUCCESS:
      return { ...state, ...reduceAction.payload.data };
    case actionArticleTypes.LOAD_ARTICLE_SUCCESS:
      const listArticles = state.list.map(article => {
        if (article._id == reduceAction.payload.data._id) {
          return { ...article, ...reduceAction.payload.data };
        }
        return article;
      });
      return {
        ...state,
        list: listArticles,
        currentArticle: {
          ...state.currentArticle,
          ...reduceAction.payload.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
