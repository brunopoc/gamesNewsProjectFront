import { Reducer } from 'redux';

export enum actionTypes {
  LOGIN_REQUEST = '@repositories/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@repositories/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@repositories/LOGIN_FAILURE',
  LOGOUT_REQUEST = '@repositories/LOGOUT_REQUEST',
}

type data = {
  name: string;
  email: string;
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
}

export const ActionsList = {
  loginRequest: (data: User) => {
    return { type: actionTypes.LOGIN_REQUEST, payload: { data } };
  },
  loginSuccess: (data: User) => {
    return { type: actionTypes.LOGIN_SUCCESS, payload: { data } };
  },
  loginFailure: () => {
    return { type: actionTypes.LOGIN_FAILURE };
  },
  logoutRequest: () => {
    return { type: actionTypes.LOGIN_REQUEST };
  },
};

const INITIAL_STATE: UserState = {
  data: {},
  logged: false,
  error: false,
  loading: false,
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        logged: true,
        data: reduceAction.payload.data,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        logged: false,
        data: {},
      };
    case actionTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case actionTypes.LOGOUT_REQUEST:
      return { ...state, logged: false };
    default:
      return state;
  }
};

export default reducer;
