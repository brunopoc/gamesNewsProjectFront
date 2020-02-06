import { Reducer } from 'redux';

export enum actionLoginTypes {
  LOGIN_REQUEST = '@login/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@login/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@login/LOGIN_FAILURE',
  LOGOUT_REQUEST = '@login/LOGOUT_REQUEST',
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
    return { type: actionLoginTypes.LOGIN_REQUEST, payload: { data } };
  },
  loginSuccess: (data: User) => {
    return { type: actionLoginTypes.LOGIN_SUCCESS, payload: { data } };
  },
  loginFailure: () => {
    return { type: actionLoginTypes.LOGIN_FAILURE };
  },
  logoutRequest: () => {
    return { type: actionLoginTypes.LOGIN_REQUEST };
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
    case actionLoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        logged: true,
        data: reduceAction.payload.data,
      };
    case actionLoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        logged: false,
        data: {},
      };
    case actionLoginTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case actionLoginTypes.LOGOUT_REQUEST:
      return { ...state, logged: false };
    default:
      return state;
  }
};

export default reducer;
