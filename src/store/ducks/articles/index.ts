import { Reducer } from 'redux';

export enum actionArticleTypes {
  ARTICLE_REQUEST = '@ARTICLE_/ARTICLE_REQUEST',
  ARTICLE_SUCCESS = '@ARTICLE_/ARTICLE_SUCCESS',
  ARTICLE_FAILURE = '@ARTICLE_/ARTICLE_FAILURE',
}

type data = {
  name: string;
  email: string;
};

export interface User {
  token?: string;
  data?: data;
}

export interface ArticleState {
  readonly data: User;
  readonly loading: boolean;
  readonly error: boolean;
}

export const ActionsList = {
  articleRequest: (data: User) => {
    return { type: actionArticleTypes.ARTICLE_REQUEST, payload: { data } };
  },
  articleSuccess: (data: User) => {
    return { type: actionArticleTypes.ARTICLE_SUCCESS, payload: { data } };
  },
  articleFailure: () => {
    return { type: actionArticleTypes.ARTICLE_FAILURE };
  },
};

const INITIAL_STATE: ArticleState = {
  data: {},
  error: false,
  loading: false,
};

const reducer: Reducer<ArticleState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionArticleTypes.ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: reduceAction.payload.data,
      };
    case actionArticleTypes.ARTICLE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        data: {},
      };
    case actionArticleTypes.ARTICLE_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default reducer;
