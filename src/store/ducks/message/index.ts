import { Reducer } from 'redux';

export enum actionMessageTypes {
  LOAD_REQUEST = '@MESSAGE_/LOAD_REQUEST',
  LOAD_READY = '@MESSAGE_/LOAD_READY',
  SUCCESS_SHOW = '@MESSAGE_/SUCCESS_SHOW',
  SUCCESS_READY = '@MESSAGE_/SUCCESS_READY',
  ERROR_SHOW = '@MESSAGE_/ERROR_SHOW',
  ERROR_READY = '@MESSAGE_/ERROR_READY',
}

export interface MessageState {
  readonly load: boolean;
  readonly success: boolean;
  readonly error: boolean;
}

export const ActionsList = {
  loadRequest: () => {
    return { type: actionMessageTypes.LOAD_REQUEST };
  },
  loadReady: () => {
    return { type: actionMessageTypes.LOAD_READY };
  },
  successShow: () => {
    return { type: actionMessageTypes.SUCCESS_SHOW };
  },
  successReady: () => {
    return { type: actionMessageTypes.SUCCESS_READY };
  },
  errorShow: () => {
    return { type: actionMessageTypes.ERROR_SHOW };
  },
  errorReady: () => {
    return { type: actionMessageTypes.ERROR_READY };
  },
};

const INITIAL_STATE: MessageState = {
  load: false,
  success: false,
  error: false,
};

const reducer: Reducer<MessageState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionMessageTypes.LOAD_REQUEST:
      return {
        ...state,
        load: true,
      };
    case actionMessageTypes.LOAD_READY:
      return {
        ...state,
        load: false,
      };
    case actionMessageTypes.SUCCESS_SHOW:
      return {
        ...state,
        success: true,
      };
    case actionMessageTypes.SUCCESS_READY:
      return {
        ...state,
        success: false,
      };
    case actionMessageTypes.ERROR_SHOW:
      return {
        ...state,
        error: true,
      };
    case actionMessageTypes.ERROR_READY:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
