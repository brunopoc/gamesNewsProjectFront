import { put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import api from '../../../utils/api';

import { ActionsList } from '.';

export function* loadCategories() {
  try {
    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/listcategories`, {
      method: 'get',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });
    const result = yield resp.json();
    yield put(ActionsList.listCategoriesSuccess(result));
  } catch (err) {
    console.error('Error on listing categories');
  }
}
