import { Reducer } from 'redux';

export enum actionCategoriesTypes {
  LIST_CATEGORIES_REQUEST = '@CATEGORIES_/LIST_CATEGORIES_REQUEST',
  LIST_CATEGORIES_SUCCESS = '@CATEGORIES_/LIST_CATEGORIES_SUCCESS',
}

export interface Categories {
  label: string;
  value: string;
}

export interface CategoriesState {
  readonly list: Categories[];
}

export const ActionsList = {
  listCategoriesRequest: () => {
    return { type: actionCategoriesTypes.LIST_CATEGORIES_REQUEST };
  },
  listCategoriesSuccess: (data: Categories[]) => {
    return { type: actionCategoriesTypes.LIST_CATEGORIES_SUCCESS, payload: data };
  },
};

const INITIAL_STATE: CategoriesState = {
  list: [],
};

const reducer: Reducer<CategoriesState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionCategoriesTypes.LIST_CATEGORIES_REQUEST:
      return {
        ...state,
      };
    case actionCategoriesTypes.LIST_CATEGORIES_SUCCESS: {
      const data = reduceAction.payload;
      return { ...state, list: data };
    }
    default:
      return state;
  }
};

export default reducer;
