import { put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { ActionsList } from '.';
import { ActionsList as MessageActionList } from '../message';
import api from '../../../utils/api';

export const getToken = state => state.user.data.token;

export function* sendComplaint(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const token = yield select(getToken);
    const { data } = value.payload;

    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/complaints/add/`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': token,
      }),
    });
    const result = yield resp.json();
    if (result.status === 'Error') {
      yield put(MessageActionList.loadReady());
    } else {
      yield put(MessageActionList.loadReady());
      yield put(MessageActionList.successShow());
    }
  } catch (err) {
    yield put(MessageActionList.loadReady());
  }
}

export function* loadComplaintsList(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/complaints/list/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'x-access-token': cookieToken,
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.complaintListSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.loadReady());
  }
}
