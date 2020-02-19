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
  ARTICLE_COMMENT_REQUEST = '@ARTICLE_/ARTICLE_COMMENT_REQUEST',
  PENDING_ARTICLE_REQUEST = '@ARTICLE_/PENDING_ARTICLE_REQUEST',
  PENDING_ARTICLE_SUCCESS = '@ARTICLE_/PENDING_ARTICLE_SUCCESS',
  PENDING_ARTICLE_UPDATE_SUCCESS = '@ARTICLE_/PENDING_ARTICLE_UPDATE_SUCCESS',
  APROVE_ARTICLE_UPDATE_REQUEST = '@ARTICLE_/APROVE_ARTICLE_UPDATE_REQUEST',
  LOAD_EDITABLE_ARTICLE = '@ARTICLE_/LOAD_EDITABLE_ARTICLE',
  ALL_ARTICLE_REQUEST = '@ARTICLE_/ALL_ARTICLE_REQUEST',
  ALL_ARTICLE_SUCCESS = '@ARTICLE_/ALL_ARTICLE_SUCCESS',
  ALL_ARTICLE_UPDATE_SUCCESS = '@ARTICLE_/ALL_ARTICLE_UPDATE_SUCCESS',
}

type Author = {
  name: string;
};

type CommentAuthor = {
  name: string;
  id: string;
  image?: string;
};

export type Answare = {
  id?: string;
  text: string;
  commentedAt?: Date;
  author: CommentAuthor;
};

export type Comment = {
  id?: string;
  text: string;
  commentedAt?: Date;
  author: CommentAuthor;
  answares?: Answare[];
};

export type Category = {
  label: string;
  value: string;
};

export type Tag = {
  label: string;
  value: string;
};

export interface Article {
  title: string;
  content: string;
  id: string;
  image?: string;
  createdAt?: Date;
  resume?: string;
  author?: Author;
  likes?: number;
  comments?: Comment[];
  refer: string;
  categories?: Category[];
  tags?: Tag[];
  aprove: string;
}

export interface ArticleState {
  readonly list: Article[];
  readonly pending?: Article[];
  readonly allPosts?: Article[];
  readonly totalOfPendingPages: number;
  readonly totalOfAllPages: number;
  readonly totalOfPages: number;
  readonly currentAllPage: number;
  readonly currentPendingPage: number;
  readonly currentPage: number;
  readonly currentArticle?: Article;
  readonly editableArticle?: Article;
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
  loadArticleRequest: (refer: string | string[]) => {
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
  pendingArticleRequest: (page: number) => {
    return { type: actionArticleTypes.PENDING_ARTICLE_REQUEST, payload: { page } };
  },
  pendingArticleSuccess: data => {
    return { type: actionArticleTypes.PENDING_ARTICLE_SUCCESS, payload: { data } };
  },
  aproveArticleUpdateRequest: data => {
    return { type: actionArticleTypes.APROVE_ARTICLE_UPDATE_REQUEST, payload: { data } };
  },
  pendingArticleUpdateSuccess: data => {
    return { type: actionArticleTypes.PENDING_ARTICLE_UPDATE_SUCCESS, payload: { data } };
  },
  loadEditableArticle: (data: Article) => {
    return { type: actionArticleTypes.LOAD_EDITABLE_ARTICLE, payload: { data } };
  },
  allArticleRequest: (page: number) => {
    return { type: actionArticleTypes.ALL_ARTICLE_REQUEST, payload: { page } };
  },
  allArticleSuccess: data => {
    return { type: actionArticleTypes.ALL_ARTICLE_SUCCESS, payload: { data } };
  },
  allArticleUpdateSuccess: data => {
    return { type: actionArticleTypes.ALL_ARTICLE_UPDATE_SUCCESS, payload: { data } };
  },
};

const INITIAL_STATE: ArticleState = {
  list: [],
  totalOfPages: 1,
  currentPage: 1,
  currentPendingPage: 1,
  totalOfPendingPages: 1,
  currentAllPage: 1,
  totalOfAllPages: 1,
};

const reducer: Reducer<ArticleState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionArticleTypes.ARTICLE_LIST_SUCCESS:
      return { ...state, ...reduceAction.payload.data };
    case actionArticleTypes.LOAD_ARTICLE_SUCCESS: {
      const listArticles = state.list.map(article => {
        if (article.id === reduceAction.payload.data.id) {
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
    }
    case actionArticleTypes.PENDING_ARTICLE_UPDATE_SUCCESS: {
      const listArticles = state.pending.filter(article => {
        return article.id !== reduceAction.payload.data.id;
      });
      return {
        ...state,
        pending: listArticles,
      };
    }
    case actionArticleTypes.ALL_ARTICLE_UPDATE_SUCCESS: {
      const listArticles = state.allPosts.map(article => {
        if (article.id === reduceAction.payload.data.id) {
          return { ...article, ...reduceAction.payload.data };
        }
        return article;
      });
      return {
        ...state,
        allPosts: listArticles,
      };
    }
    case actionArticleTypes.PENDING_ARTICLE_SUCCESS:
      return { ...state, ...reduceAction.payload.data };
    case actionArticleTypes.ALL_ARTICLE_SUCCESS:
      return { ...state, ...reduceAction.payload.data };
    case actionArticleTypes.LOAD_EDITABLE_ARTICLE:
      return { ...state, editableArticle: reduceAction.payload.data };
    default:
      return state;
  }
};

export default reducer;
