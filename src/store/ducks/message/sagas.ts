import { put, delay } from 'redux-saga/effects';
import { ActionsList } from '.';

export function* showMessage() {
  yield delay(4000);
  yield put(ActionsList.successReady());
}

export function* showError() {
  yield delay(4000);
  yield put(ActionsList.errorReady());
}
