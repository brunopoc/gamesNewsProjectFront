import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import articles from './articles';

export default combineReducers({
  login,
  register,
  articles,
});
