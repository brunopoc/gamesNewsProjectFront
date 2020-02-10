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
}

type data = {
  _id: number;
  name: string;
  email: string;
  type?: string;
};

export interface User {
  token?: string;
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
};

const INITIAL_STATE: UserState = {
  data: { data: { name: '', email: '', _id: 0 } },
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
        data: {},
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
        data: reduceAction.payload.data,
      };
    case actionLoginTypes.LOGOUT_REQUEST:
      Cookies.remove('token');
      return { ...state, data: {}, logged: false, redirect: true };
    default:
      return state;
  }
};

export default reducer;
