import { all, takeLatest } from 'redux-saga/effects';

import { actionLoginTypes } from './user';
import { actionRegisterTypes } from './register';
import { actionArticleTypes } from './articles';
import { sendLogin, retrieveToken } from './user/sagas';
import { sendRegister } from './register/sagas';
import { sendArticle, loadArticle } from './articles/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(actionLoginTypes.LOGIN_REQUEST, sendLogin),
    takeLatest(actionRegisterTypes.REGISTER_REQUEST, sendRegister),
    takeLatest(actionLoginTypes.TOKEN_RETRIEVE_REQUEST, retrieveToken),
    takeLatest(actionArticleTypes.ARTICLE_REQUEST, sendArticle),
    takeLatest(actionArticleTypes.ARTICLE_LIST_REQUEST, loadArticle),
  ]);
}
