import { all, takeLatest } from 'redux-saga/effects';

import { actionLoginTypes } from './user';
import { actionRegisterTypes } from './register';
import { actionArticleTypes } from './articles';
import { actionCategoriesTypes } from './categories';
import { actionMessageTypes } from './message';
import { actionComplaintTypes } from './complaints';
import {
  sendLogin,
  retrieveToken,
  updateProfile,
  loadAllUsers,
  loadBlockUser,
  confirmEmail,
  forgotPassword,
  resetPassword,
} from './user/sagas';
import { sendRegister } from './register/sagas';
import {
  sendArticle,
  loadArticleList,
  loadArticle,
  likeArticle,
  articleComment,
  loadPedingArticle,
  loadAproveArticleUpdate,
  loadAllArticle,
  loadPersonalArticle,
  loadArticleListByCategory,
  loadArticleListByTag,
  loadSimilarArticles,
} from './articles/sagas';
import { loadCategories } from './categories/sagas';
import { showMessage, showError } from './message/sagas';
import { sendComplaint, loadComplaintsList } from './complaints/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(actionLoginTypes.LOGIN_REQUEST, sendLogin),
    takeLatest(actionLoginTypes.TOKEN_RETRIEVE_REQUEST, retrieveToken),
    takeLatest(actionLoginTypes.UPDATE_PROFILE_REQUEST, updateProfile),
    takeLatest(actionLoginTypes.LIST_USERS_REQUEST, loadAllUsers),
    takeLatest(actionLoginTypes.BLOCK_REQUEST, loadBlockUser),
    takeLatest(actionLoginTypes.CONFIRM_EMAIL_REQUEST, confirmEmail),
    takeLatest(actionLoginTypes.FORGOT_PASSWORD_REQUEST, forgotPassword),
    takeLatest(actionLoginTypes.RESET_PASSWORD_REQUEST, resetPassword),

    takeLatest(actionRegisterTypes.REGISTER_REQUEST, sendRegister),

    takeLatest(actionArticleTypes.ARTICLE_REQUEST, sendArticle),
    takeLatest(actionArticleTypes.ARTICLE_LIST_REQUEST, loadArticleList),
    takeLatest(actionArticleTypes.ARTICLE_LIST_REQUEST_BY_CATEGORY, loadArticleListByCategory),
    takeLatest(actionArticleTypes.ARTICLE_LIST_REQUEST_BY_TAG, loadArticleListByTag),
    takeLatest(actionArticleTypes.LOAD_ARTICLE_REQUEST, loadArticle),
    takeLatest(actionArticleTypes.ARTICLE_UPDATE_LIKE_REQUEST, likeArticle),
    takeLatest(actionArticleTypes.ARTICLE_COMMENT_REQUEST, articleComment),
    takeLatest(actionArticleTypes.PENDING_ARTICLE_REQUEST, loadPedingArticle),
    takeLatest(actionArticleTypes.APROVE_ARTICLE_UPDATE_REQUEST, loadAproveArticleUpdate),
    takeLatest(actionArticleTypes.ALL_ARTICLE_REQUEST, loadAllArticle),
    takeLatest(actionArticleTypes.PERSONAL_ARTICLE_REQUEST, loadPersonalArticle),
    takeLatest(actionArticleTypes.LOAD_SIMILAR_ARTICLE_REQUEST, loadSimilarArticles),

    takeLatest(actionCategoriesTypes.LIST_CATEGORIES_REQUEST, loadCategories),

    takeLatest(actionMessageTypes.SUCCESS_SHOW, showMessage),
    takeLatest(actionMessageTypes.ERROR_SHOW, showError),

    takeLatest(actionComplaintTypes.COMPLAINT_REQUEST, sendComplaint),
    takeLatest(actionComplaintTypes.COMPLAINT_LIST_REQUEST, loadComplaintsList),
  ]);
}
