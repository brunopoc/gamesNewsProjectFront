import { Reducer } from 'redux';

export enum actionRegisterTypes {
  REGISTER_REQUEST = '@register/REGISTER_REQUEST',
  REGISTER_SUCCESS = '@register/REGISTER_SUCCESS',
  REGISTER_FAILURE = '@register/REGISTER_FAILURE',
}

type data = {
  name: string;
  email: string;
};

export interface User {
  token?: string;
  data?: data;
}

export interface RegisterState {
  readonly data: User;
  readonly loading: boolean;
  readonly error: boolean;
}

export const ActionsList = {
  registerRequest: (data: User) => {
    return { type: actionRegisterTypes.REGISTER_REQUEST, payload: { data } };
  },
  registerSuccess: (data: User) => {
    return { type: actionRegisterTypes.REGISTER_SUCCESS, payload: { data } };
  },
  registerFailure: () => {
    return { type: actionRegisterTypes.REGISTER_FAILURE };
  },
};

const INITIAL_STATE: RegisterState = {
  data: {},
  error: false,
  loading: false,
};

const reducer: Reducer<RegisterState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionRegisterTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: reduceAction.payload.data,
      };
    case actionRegisterTypes.REGISTER_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        data: {},
      };
    case actionRegisterTypes.REGISTER_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default reducer;
