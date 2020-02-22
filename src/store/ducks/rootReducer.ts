import { combineReducers } from 'redux';
import user from './user';
import register from './register';
import articles from './articles';
import categories from './categories';
import message from './message';
import complaints from './complaints';

export default combineReducers({
  user,
  register,
  articles,
  categories,
  message,
  complaints,
});
