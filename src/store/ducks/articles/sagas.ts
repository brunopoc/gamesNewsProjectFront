import { put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { ApplicationState } from '../../index';
import { ActionsList } from '.';
import { ActionsList as MessageActionList } from '../message';

export const getToken = (state: ApplicationState) => state.user.data.token;

export function* sendArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const token = yield select(getToken);
    const formdata = value.payload.data;
    const imgFormData = new FormData();
    imgFormData.append('upload', formdata.upload, formdata.upload.name);
    const imgUpload = yield fetch(`http://localhost:4000/api/v1/posts/uploadImage/`, {
      method: 'post',
      body: imgFormData,
    });
    const imgResult = yield imgUpload.json();

    const data = { ...formdata, image: imgResult.url };

    const resp = yield fetch(`http://localhost:4000/api/v1/posts/`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': token,
      }),
    });
    const result = yield resp.json();
    if (result.status === 'Error') {
      yield put(ActionsList.articleFailure());
      yield put(MessageActionList.loadReady());
    } else {
      yield put(ActionsList.articleSuccess());
      yield put(MessageActionList.loadReady());
      yield put(MessageActionList.successShow());
    }
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.loadReady());
  }
}

export function* loadArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const resp = yield fetch(`http://localhost:4000/api/v1/posts/list/${value.payload.page}`, {
      method: 'get',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    const result = yield resp.json();

    yield put(ActionsList.articleListSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.loadReady());
  }
}
