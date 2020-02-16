import { put, select, delay } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import api from '../../../utils/api';

import { ActionsList } from '.';

export const getToken = state => state.user.data.token;

export function* loadCategories() {
  yield delay(3000);
  try {
    const token = yield select(getToken);

    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/listcategories`, {
      method: 'get',
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': token,
      }),
    });
    const result = yield resp.json();
    if (!result.message) yield put(ActionsList.listCategoriesSuccess(result));
  } catch (err) {
    console.error('Error on listing categories');
  }
}
