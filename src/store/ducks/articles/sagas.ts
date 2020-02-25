import { put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { ActionsList } from '.';
import { ActionsList as MessageActionList } from '../message';
import { ActionsList as UserActionList } from '../user';
import api from '../../../utils/api';

export const getToken = state => state.user.data.token;

export function* sendArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    let data;
    const token = yield select(getToken);
    const formdata = value.payload.data;
    if (!formdata.image) {
      const imgFormData = new FormData();
      imgFormData.append('upload', formdata.upload, formdata.upload.name);
      const imgUpload = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/uploadImage/`, {
        method: 'post',
        body: imgFormData,
      });
      const imgResult = yield imgUpload.json();
      data = { ...formdata, image: imgResult.url };
    } else {
      data = { ...formdata };
    }

    const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/`, {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': token,
      }),
    });
    const result = yield resp.json();
    if (result.status === 'Error') {
      yield put(ActionsList.articleFailure());
      yield put(MessageActionList.loadReady());
      yield put(MessageActionList.errorShow());
    } else {
      value.payload.resetForm();
      yield put(ActionsList.articleSuccess());
      yield put(MessageActionList.loadReady());
      yield put(MessageActionList.successShow());
    }
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.errorShow());
    yield put(MessageActionList.loadReady());
  }
}

export function* loadArticleList(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/list/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.articleListSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadArticleListByCategory(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/category/${value.payload.category}/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.articleListSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadArticleListByTag(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/tag/${value.payload.tag}/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.articleListSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/article/${value.payload.refer}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.loadArticleSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(ActionsList.articleFailure());
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* likeArticle(value) {
  const token = yield select(getToken);
  const data = { action: value.payload.data.action };
  const userData = { id: value.payload.data.userId, likedPosts: value.payload.data.likedPosts };

  const resp = yield fetch(
    `${api.publicRuntimeConfig.API_ENDPOINT}/posts/like/${value.payload.data.id}`,
    {
      method: 'post',
      body: JSON.stringify(data, null, 2),
      headers: new Headers({
        'content-type': 'application/json',
        'x-access-token': token,
      }),
    },
  );
  const result = yield resp.json();

  const respUser = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/users/update/likes`, {
    method: 'post',
    body: JSON.stringify(userData, null, 2),
    headers: new Headers({
      'content-type': 'application/json',
      'x-access-token': token,
    }),
  });
  const resultUser = yield respUser.json();

  if (!resultUser.message) {
    yield put(UserActionList.userLikeRetrieveSuccess(resultUser));
  }

  if (!result.message) {
    yield put(ActionsList.loadArticleSuccess(result));
  }
}

export function* articleComment(value) {
  const token = yield select(getToken);
  const { comments, articleID } = value.payload.data;

  const resp = yield fetch(`${api.publicRuntimeConfig.API_ENDPOINT}/posts/comment/${articleID}`, {
    method: 'post',
    body: JSON.stringify(comments, null, 2),
    headers: new Headers({
      'content-type': 'application/json',
      'x-access-token': token,
    }),
  });

  const result = yield resp.json();

  if (!result.message) {
    yield put(MessageActionList.successShow());
    yield put(ActionsList.loadArticleSuccess(result));
  } else {
    yield put(MessageActionList.errorShow());
  }
}

export function* loadPedingArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/pending/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'x-access-token': cookieToken,
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.pendingArticleSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadAproveArticleUpdate(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/aprove/${value.payload.data.id}`,
      {
        method: 'post',
        body: JSON.stringify({ aprove: value.payload.data.aprove }, null, 2),
        headers: new Headers({
          'content-type': 'application/json',
          'x-access-token': cookieToken,
        }),
      },
    );

    const result = yield resp.json();

    if (value.payload.data.section === 'pending') {
      yield put(ActionsList.pendingArticleUpdateSuccess(result));
    }
    if (value.payload.data.section === 'all') {
      yield put(ActionsList.allArticleUpdateSuccess(result));
    }
    if (value.payload.data.section === 'personal') {
      yield put(ActionsList.personalArticleUpdateSuccess(result));
    }
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.successShow());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadAllArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/all/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'x-access-token': cookieToken,
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.allArticleSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadPersonalArticle(value) {
  yield put(MessageActionList.loadRequest());
  try {
    const cookieToken = Cookies.get('token');
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/personal/${value.payload.page}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'x-access-token': cookieToken,
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.personalArticleSuccess(result));
    yield put(MessageActionList.loadReady());
  } catch (err) {
    yield put(MessageActionList.loadReady());
    yield put(MessageActionList.errorShow());
  }
}

export function* loadSimilarArticles(value) {
  try {
    const resp = yield fetch(
      `${api.publicRuntimeConfig.API_ENDPOINT}/posts/similar/${value.payload.data}`,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const result = yield resp.json();

    yield put(ActionsList.loadSimilarArticleSuccess(result));
  } catch (err) {
    yield put(MessageActionList.errorShow());
  }
}
