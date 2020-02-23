import { put, all } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';
import api from '../../../utils/api';

import { ActionsList } from '.';
import { ActionsList as LoginActionList } from '../user';
import { ActionsList as MessageActionList } from '../message';

export function* sendRegister(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/singup`, {
      method: 'post',
      body: JSON.stringify(value.payload.data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    const result = yield resp.json();
    if (result.token) {
      Cookies.set('token', result.token);
    }
    if (result.message) {
      yield put(MessageActionList.loadReady());
      yield put(ActionsList.registerFailure());
      yield put(MessageActionList.errorShow());
    } else {
      yield put(MessageActionList.loadReady());
      yield all([
        put(ActionsList.registerSuccess(result)),
        put(LoginActionList.loginSuccess(result)),
      ]);
    }
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(ActionsList.registerFailure());
    yield put(MessageActionList.errorShow());
  }
}
