import { put, all } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

import { ActionsList } from '.';
import { ActionsList as LoginActionList } from '../login';

export function* sendRegister(value) {
  try {
    const resp = yield fetch(`http://localhost:4000/api/v1/users/singup`, {
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
    yield all([
      put(ActionsList.registerSuccess(result)),
      put(LoginActionList.loginSuccess(result)),
    ]);
  } catch (err) {
    yield put(ActionsList.registerFailure());
  }
}
