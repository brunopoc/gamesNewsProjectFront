import { all, takeLatest } from 'redux-saga/effects';

import { actionLoginTypes } from './login';
import { actionRegisterTypes } from './register';
import { sendLogin } from './login/sagas';
import { sendRegister } from './register/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(actionLoginTypes.LOGIN_REQUEST, sendLogin),
    takeLatest(actionRegisterTypes.REGISTER_REQUEST, sendRegister),
  ]);
}
