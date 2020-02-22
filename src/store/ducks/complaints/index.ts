import { Reducer } from 'redux';

export enum actionComplaintTypes {
  COMPLAINT_REQUEST = '@COMPLAINT_/COMPLAINT_REQUEST',
  COMPLAINT_LIST_REQUEST = '@COMPLAINT_/COMPLAINT_LIST_REQUEST',
  COMPLAINT_LIST_SUCCESS = '@COMPLAINT_/COMPLAINT_LIST_SUCCESS',
}

type Refer = {
  type: string;
  id: string;
};

type Informer = {
  name: string;
  id: string;
};

type Acused = {
  name: string;
  id: string;
};

export interface Complaint {
  info: string;
  refer: Refer;
  informer: Informer;
  accused?: Acused;
  createdAt?: Date;
}

export interface ComplaintState {
  readonly complaints: Complaint[];
  readonly totalOfPages: number;
  readonly currentPage: number;
}

export const ActionsList = {
  complaintRequest: data => {
    return { type: actionComplaintTypes.COMPLAINT_REQUEST, payload: { data } };
  },
  complaintListRequest: (page: number) => {
    return { type: actionComplaintTypes.COMPLAINT_LIST_REQUEST, payload: { page } };
  },
  complaintListSuccess: (data: ComplaintState) => {
    return { type: actionComplaintTypes.COMPLAINT_LIST_SUCCESS, payload: { data } };
  },
};

const INITIAL_STATE: ComplaintState = {
  complaints: [],
  totalOfPages: 1,
  currentPage: 1,
};

const reducer: Reducer<ComplaintState> = (state = INITIAL_STATE, reduceAction) => {
  switch (reduceAction.type) {
    case actionComplaintTypes.COMPLAINT_LIST_SUCCESS:
      return { ...state, ...reduceAction.payload.data };
    default:
      return state;
  }
};

export default reducer;
