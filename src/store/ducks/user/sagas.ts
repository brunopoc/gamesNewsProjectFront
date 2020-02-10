import { put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';

import { ActionsList } from '.';

export function* sendLogin(value) {
  try {
    const resp = yield fetch(`http://localhost:4000/api/v1/users/singin`, {
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
      yield put(ActionsList.loginFailure());
    } else {
      yield put(ActionsList.loginSuccess(result));
    }
  } catch (err) {
    yield put(ActionsList.loginFailure());
  }
}

export function* retrieveToken(value) {
  try {
    const resp = yield fetch(`http://localhost:4000/api/v1/users/myuser`, {
      method: 'get',
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': value.payload.data.token,
      }),
    });
    const result = yield resp.json();
    if (result.token) {
      Cookies.set('token', result.token);
    }
    if (result.message) {
      yield put(ActionsList.logoutRequest());
    } else {
      yield put(ActionsList.tokenRetrieveSuccess(result));
    }
  } catch (err) {
    yield put(ActionsList.logoutRequest());
  }
}
