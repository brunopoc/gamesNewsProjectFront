import { combineReducers } from 'redux';
import user from './user';
import register from './register';
import articles from './articles';

export default combineReducers({
  user,
  register,
  articles,
});
