import { combineReducers } from 'redux';
import user from './user';
import register from './register';
import articles from './articles';
import categories from './categories';
import message from './message';

export default combineReducers({
  user,
  register,
  articles,
  categories,
  message,
});
