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
  CONFIRM_EMAIL_REQUEST = '@user/CONFIRM_EMAIL_REQUEST',
  CONFIRM_EMAIL_ERROR = '@user/CONFIRM_EMAIL_ERROR',
  FORGOT_PASSWORD_REQUEST = '@user/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_ERROR = '@user/FORGOT_PASSWORD_ERROR',
  FORGOT_PASSWORD_SUCCESS = '@user/FORGOT_PASSWORD_SUCCESS',
  RESET_PASSWORD_REQUEST = '@user/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = '@user/RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_ERROR = '@user/RESET_PASSWORD_ERROR',
}

type data = {
  id: string;
  name: string;
  email: string;
  type?: string;
  avatar?: string;
  blocked?: boolean;
  likedPosts?: string[];
  emailChecked: boolean;
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
  readonly verifiedError: boolean;
  readonly forgetPasswordError: boolean;
  readonly forgetPasswordSuccess: boolean;
  readonly resetPasswordError: boolean;
  readonly resetPasswordSuccess: boolean;
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
    return { type: actionLoginTypes.UPDATE_PROFILE_SUCCESS, payload: { data } };
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
  confirmEmailRequest: (token: string) => {
    return { type: actionLoginTypes.CONFIRM_EMAIL_REQUEST, payload: { token } };
  },
  confirmEmailError: () => {
    return { type: actionLoginTypes.CONFIRM_EMAIL_ERROR };
  },
  forgotPasswordRequest: (email: string) => {
    return { type: actionLoginTypes.FORGOT_PASSWORD_REQUEST, payload: { email } };
  },
  forgotPasswordError: () => {
    return { type: actionLoginTypes.FORGOT_PASSWORD_ERROR };
  },
  forgotPasswordSuccess: () => {
    return { type: actionLoginTypes.FORGOT_PASSWORD_SUCCESS };
  },
  resetPasswordRequest: data => {
    return { type: actionLoginTypes.RESET_PASSWORD_REQUEST, payload: { data } };
  },
  resetPasswordSuccess: () => {
    return { type: actionLoginTypes.RESET_PASSWORD_SUCCESS };
  },
  resetPasswordError: () => {
    return { type: actionLoginTypes.RESET_PASSWORD_ERROR };
  },
};

const INITIAL_STATE: UserState = {
  data: {
    data: { name: '', email: '', id: '', likedPosts: [], avatar: '', emailChecked: false },
    totalOfUsers: 1,
    currentUsersPage: 1,
  },
  logged: false,
  error: false,
  loading: false,
  redirect: false,
  verifiedError: false,
  forgetPasswordError: false,
  forgetPasswordSuccess: false,
  resetPasswordError: false,
  resetPasswordSuccess: false,
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
    case actionLoginTypes.CONFIRM_EMAIL_ERROR:
      return { ...state, verifiedError: true };
    case actionLoginTypes.FORGOT_PASSWORD_ERROR:
      return { ...state, forgetPasswordError: true };
    case actionLoginTypes.FORGOT_PASSWORD_SUCCESS:
      return { ...state, forgetPasswordSuccess: true };
    case actionLoginTypes.RESET_PASSWORD_ERROR:
      return { ...state, resetPasswordError: true };
    case actionLoginTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordSuccess: true };
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
