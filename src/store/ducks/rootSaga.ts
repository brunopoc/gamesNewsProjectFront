import { all, takeLatest } from 'redux-saga/effects';

import { actionTypes } from './login';
import { send } from './login/sagas';

export default function* rootSaga() {
  return yield all([takeLatest(actionTypes.LOGIN_REQUEST, send)]);
}
