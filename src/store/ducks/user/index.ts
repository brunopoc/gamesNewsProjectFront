import { Reducer } from 'redux';
import Cookies from 'js-cookie';

export enum actionLoginTypes {
  LOGIN_REQUEST = '@login/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@login/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@login/LOGIN_FAILURE',
  LOGOUT_REQUEST = '@login/LOGOUT_REQUEST',
  REDIRECT_REQUEST = '@login/REDIRECT_REQUEST',
  TOKEN_RETRIEVE_REQUEST = '@login/TOKEN_RETRIEVE_REQUEST',
  TOKEN_RETRIEVE_SUCCESS = '@login/TOKEN_RETRIEVE_SUCCESS',
  USER_LIKE_RETRIEVE_SUCCESS = '@user/USER_LIKE_RETRIEVE_SUCCESS',
  UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@user/UPDATE_PROFILE_SUCCESS',
  LIST_USERS_REQUEST = '@user/LIST_USERS_REQUEST',
  LIST_USERS_SUCCESS = '@user/LIST_USERS_SUCCESS',
  BLOCK_REQUEST = '@user/BLOCK_REQUEST',
  BLOCK_SUCCESS = '@user/BLOCK_SUCCESS',
}

type data = {
  id: string;
  name: string;
  email: string;
  type?: string;
  avatar?: string;
  blocked?: boolean;
  likedPosts?: string[];
};

export interface User {
  token?: string;
  users?: data[];
  totalOfUsers?: number;
  currentUsersPage?: number;
  data?: data;
}

export interface UserState {
  readonly data: User;
  readonly logged: boolean;
  readonly loading: boolean;
  readonly error: boolean;
  readonly redirect: boolean;
}

export const ActionsList = {
  loginRequest: (data: User) => {
    return { type: actionLoginTypes.LOGIN_REQUEST, payload: { data } };
  },
  loginSuccess: (data: User) => {
    return { type: actionLoginTypes.LOGIN_SUCCESS, payload: { data } };
  },
  loginFailure: () => {
    return { type: actionLoginTypes.LOGIN_FAILURE };
  },
  logoutRequest: () => {
    return { type: actionLoginTypes.LOGOUT_REQUEST };
  },
  redirectRequest: () => {
    return { type: actionLoginTypes.LOGOUT_REQUEST };
  },
  tokenRetrieveRequest: (data: User) => {
    return { type: actionLoginTypes.TOKEN_RETRIEVE_REQUEST, payload: { data } };
  },
  tokenRetrieveSuccess: (data: User) => {
    return { type: actionLoginTypes.TOKEN_RETRIEVE_SUCCESS, payload: { data } };
  },
  userLikeRetrieveSuccess: (data: User) => {
    return { type: actionLoginTypes.USER_LIKE_RETRIEVE_SUCCESS, payload: { data } };
  },
  updateProfileRequest: (data: data) => {
    return { type: actionLoginTypes.UPDATE_PROFILE_REQUEST, payload: { data } };
  },
  updateProfileSuccess: (data: User) => {
    return { type: actionLoginTypes.UPDATE_PROFILE_REQUEST, payload: { data } };
  },
  listUsersRequest: (page: number) => {
    return { type: actionLoginTypes.LIST_USERS_REQUEST, payload: { page } };
  },
  listUsersSuccess: data => {
    return { type: actionLoginTypes.LIST_USERS_SUCCESS, payload: { data } };
  },
  blockRequest: (id: string, blocked: boolean) => {
    return { type: actionLoginTypes.BLOCK_REQUEST, payload: { blocked, id } };
  },
  blockSuccess: data => {
    return { type: actionLoginTypes.BLOCK_SUCCESS, payload: { data } };
  },
};

const INITIAL_STATE: UserState = {
  data: {
    data: { name: '', email: '', id: '', likedPosts: [], avatar: '' },
    totalOfUsers: 1,
    currentUsersPage: 1,
  },
  logged: false,
  error: false,
  loading: false,
  redirect: false,
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionLoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        logged: true,
        redirect: false,
        data: reduceAction.payload.data,
      };
    case actionLoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        logged: false,
        redirect: true,
        data: { ...state.data },
      };
    case actionLoginTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case actionLoginTypes.REDIRECT_REQUEST:
      return { ...state, redirect: true };
    case actionLoginTypes.TOKEN_RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        logged: true,
        redirect: false,
        data: {
          ...state.data,
          token: reduceAction.payload.data.token,
          data: { ...state.data.data, ...reduceAction.payload.data.data },
        },
      };
    case actionLoginTypes.USER_LIKE_RETRIEVE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          data: { ...state.data.data, ...reduceAction.payload.data.data },
        },
      };
    case actionLoginTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          data: { ...state.data.data, ...reduceAction.payload.data.data },
        },
      };
    case actionLoginTypes.LOGOUT_REQUEST: {
      Cookies.remove('token');
      return {
        ...state,
        data: { data: { name: '', email: '', id: '0', likedPosts: [] } },
        logged: false,
        redirect: true,
      };
    }
    case actionLoginTypes.LIST_USERS_SUCCESS:
      return { ...state, data: { ...state.data, ...reduceAction.payload.data } };
    case actionLoginTypes.BLOCK_SUCCESS: {
      const listUsers = state.data.users.map(user => {
        if (user.id === reduceAction.payload.data.id) {
          return { ...user, ...reduceAction.payload.data };
        }
        return user;
      });
      return {
        ...state,
        data: { ...state.data, users: listUsers },
      };
    }
    default:
      return state;
  }
};

export default reducer;
