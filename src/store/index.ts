import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { UserState } from './ducks/user';
import { RegisterState } from './ducks/register';
import { ArticleState } from './ducks/articles';
import { CategoriesState } from './ducks/categories';
import { MessageState } from './ducks/Message';
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  user: UserState;
  register: RegisterState;
  articles: ArticleState;
  categories: CategoriesState;
  message: MessageState;
}

const bindMiddleware = (middleware: any) => applyMiddleware(...middleware);

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store: Store<ApplicationState> = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
