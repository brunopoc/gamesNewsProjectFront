import { put } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

import { ActionsList } from '.';

export function* send(value) {
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
    yield put(ActionsList.loginSuccess(result));
  } catch (err) {
    yield put(ActionsList.loginFailure());
  }
}
