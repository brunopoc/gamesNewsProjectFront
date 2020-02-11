import { all, takeLatest } from 'redux-saga/effects';

import { actionLoginTypes } from './user';
import { actionRegisterTypes } from './register';
import { actionArticleTypes } from './articles';
import { actionCategoriesTypes } from './categories';
import { actionMessageTypes } from './message';
import { sendLogin, retrieveToken } from './user/sagas';
import { sendRegister } from './register/sagas';
import { sendArticle, loadArticleList, loadArticle } from './articles/sagas';
import { loadCategories } from './categories/sagas';
import { showMessage } from './message/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(actionLoginTypes.LOGIN_REQUEST, sendLogin),
    takeLatest(actionRegisterTypes.REGISTER_REQUEST, sendRegister),
    takeLatest(actionLoginTypes.TOKEN_RETRIEVE_REQUEST, retrieveToken),
    takeLatest(actionArticleTypes.ARTICLE_REQUEST, sendArticle),
    takeLatest(actionArticleTypes.ARTICLE_LIST_REQUEST, loadArticleList),
    takeLatest(actionArticleTypes.LOAD_ARTICLE_REQUEST, loadArticle),
    takeLatest(actionCategoriesTypes.LIST_CATEGORIES_REQUEST, loadCategories),
    takeLatest(actionMessageTypes.SUCCESS_SHOW, showMessage),
  ]);
}
