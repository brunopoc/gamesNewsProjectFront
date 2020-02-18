import { all, takeLatest } from 'redux-saga/effects';

import { actionLoginTypes } from './user';
import { actionRegisterTypes } from './register';
import { actionArticleTypes } from './articles';
import { actionCategoriesTypes } from './categories';
import { actionMessageTypes } from './message';
import { sendLogin, retrieveToken, updateProfile } from './user/sagas';
import { sendRegister } from './register/sagas';
import {
  sendArticle,
  loadArticleList,
  loadArticle,
  likeArticle,
  articleComment,
  loadPedingArticle,
  loadPendingArticleUpdate,
  loadAllArticle,
} from './articles/sagas';
import { loadCategories } from './categories/sagas';
import { showMessage } from './message/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(actionLoginTypes.LOGIN_REQUEST, sendLogin),
    takeLatest(actionLoginTypes.TOKEN_RETRIEVE_REQUEST, retrieveToken),
    takeLatest(actionLoginTypes.UPDATE_PROFILE_REQUEST, updateProfile),
    takeLatest(actionRegisterTypes.REGISTER_REQUEST, sendRegister),
    takeLatest(actionArticleTypes.ARTICLE_REQUEST, sendArticle),
    takeLatest(actionArticleTypes.ARTICLE_LIST_REQUEST, loadArticleList),
    takeLatest(actionArticleTypes.LOAD_ARTICLE_REQUEST, loadArticle),
    takeLatest(actionArticleTypes.ARTICLE_UPDATE_LIKE_REQUEST, likeArticle),
    takeLatest(actionArticleTypes.ARTICLE_COMMENT_REQUEST, articleComment),
    takeLatest(actionArticleTypes.PENDING_ARTICLE_REQUEST, loadPedingArticle),
    takeLatest(actionArticleTypes.PENDING_ARTICLE_UPDATE_REQUEST, loadPendingArticleUpdate),
    takeLatest(actionArticleTypes.ALL_ARTICLE_REQUEST, loadAllArticle),
    takeLatest(actionCategoriesTypes.LIST_CATEGORIES_REQUEST, loadCategories),
    takeLatest(actionMessageTypes.SUCCESS_SHOW, showMessage),
  ]);
}
