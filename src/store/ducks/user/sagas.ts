import { put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import api from '../../../utils/api';
import { ActionsList as MessageActionList } from '../message';

import { ActionsList } from '.';

export const getToken = state => state.user.data.token;

export function* sendLogin(value) {
  try {
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/singin`, {
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
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/myuser`, {
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

export function* updateProfile(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const token = yield select(getToken);
    const formdata = value.payload.data;
    const imgFormData = new FormData();
    imgFormData.append('upload', formdata.upload, formdata.upload.name);
    const imgUpload = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/uploadImage/`, {
      method: 'post',
      body: imgFormData,
    });
    const imgResult = yield imgUpload.json();

    const data = { ...formdata, avatar: imgResult.url };

    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/update/profile`, {
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
      yield put(ActionsList.updateProfileSuccess(result));
    }
  } catch (err) {
    yield put(MessageActionList.loadReady());
  }
}

export function* loadAllUsers(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/users/list/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'x-access-token': cookieToken,
        }),
      },
    );
    const result = yield resp.json();
    yield put(ActionsList.listUsersSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.loadReady());
  }
}

export function* loadBlockUser(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const data = { ...value.payload };
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/admin/blocked`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': cookieToken,
      }),
    });
    const result = yield resp.json();
    yield put(ActionsList.blockSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.loadReady());
  }
}
