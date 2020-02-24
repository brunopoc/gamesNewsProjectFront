import { put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import api from '../../../utils/api';
import { ActionsList as MessageActionList } from '../message';

import { ActionsList } from '.';

export const getToken = state => state.user.data.token;

export function* sendLogin(value) {
  yield put(MessageActionList.loadRequest());
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
      yield put(MessageActionList.loadReady());
      yield put(ActionsList.loginFailure());
      yield put(MessageActionList.errorShow());
    } else {
      yield put(MessageActionList.loadReady());
      yield put(ActionsList.loginSuccess(result));
    }
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(ActionsList.loginFailure());
    yield put(MessageActionList.errorShow());
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
    let imgUpload;
    let imgResult = { url: '' };
    if (formdata.upload) {
      imgFormData.append('upload', formdata.upload, formdata.upload.name);
      imgUpload = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/uploadImage/`, {
        method: 'post',
        body: imgFormData,
      });
      imgResult = yield imgUpload.json();
    }

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
      yield put(MessageActionList.errorShow());
    } else {
      yield put(MessageActionList.loadReady());
      yield put(MessageActionList.successShow());
      yield put(ActionsList.updateProfileSuccess(result));
    }
  } catch (err) {
    yield put(MessageActionList.errorShow());
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
    yield put(MessageActionList.successShow());
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.errorShow());
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
    yield put(MessageActionList.successShow());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* confirmEmail(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const data = { token: value.payload.token };
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/confirmemail`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    const result = yield resp.json();
    if (result.message !== 'Success') yield put(ActionsList.confirmEmailError());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.successShow());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* forgotPassword(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const data = { email: value.payload.email };
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/forgetpassword`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    const result = yield resp.json();
    if (result.message !== 'Success') yield put(ActionsList.forgotPasswordError());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.successShow());
    yield put(ActionsList.forgotPasswordSuccess());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* resetPassword(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const data = { ...value.payload.data };
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/resetpassword`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    const result = yield resp.json();
    if (result.message !== 'Success') yield put(ActionsList.resetPasswordError());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.successShow());
    yield put(ActionsList.resetPasswordSuccess());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
    yield put(ActionsList.resetPasswordError());
  }
}
