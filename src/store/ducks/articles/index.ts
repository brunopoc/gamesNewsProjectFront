import { Reducer } from 'redux';

export enum actionArticleTypes {
  ARTICLE_REQUEST = '@ARTICLE_/ARTICLE_REQUEST',
  ARTICLE_SUCCESS = '@ARTICLE_/ARTICLE_SUCCESS',
  ARTICLE_FAILURE = '@ARTICLE_/ARTICLE_FAILURE',
  ARTICLE_LIST_REQUEST = '@ARTICLE_/ARTICLE_LIST_REQUEST',
  ARTICLE_LIST_SUCCESS = '@ARTICLE_/ARTICLE_LIST_SUCCESS',
}

type Author = {
  name: string;
};

type Comments = {
  text: string;
  commentedAt: Date;
  author: string;
};

export interface Article {
  title: string;
  content: string;
  _id: number;
  image?: string;
  createdAt: Date;
  resume?: string;
  author?: Author;
  likes?: number;
  comments?: Comments[];
}

export interface ArticleState {
  readonly list: Article[];
  readonly totalOfPages: number;
  readonly currentPage: number;
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
};

const INITIAL_STATE: ArticleState = {
  list: [],
  totalOfPages: 1,
  currentPage: 1,
};

const reducer: Reducer<ArticleState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionArticleTypes.ARTICLE_SUCCESS:
      return {
        ...state,
      };
    case actionArticleTypes.ARTICLE_FAILURE:
      return {
        ...state,
      };
    case actionArticleTypes.ARTICLE_REQUEST:
      return { ...state };
    case actionArticleTypes.ARTICLE_LIST_SUCCESS:
      const { data } = reduceAction.payload;
      return { ...state, ...data };
    default:
      return state;
  }
};

export default reducer;
