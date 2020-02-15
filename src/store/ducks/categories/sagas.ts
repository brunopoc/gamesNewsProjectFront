import { put, select, delay } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { ActionsList } from '.';

export const getToken = state => state.user.data.token;

export function* loadCategories() {
  yield delay(3000);
  try {
    const token = yield select(getToken);

    const resp = yield fetch(`http://localhost:4000/api/v1/posts/listcategories`, {
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
