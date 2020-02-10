import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { ApplicationState } from '../store';
import { ActionsList } from '../store/ducks/user';

export const RetrieveData = (logged: boolean) => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  if (!!token && logged === false) {
    dispatch(ActionsList.tokenRetrieveRequest({ token }));
  }
};

export const withAuthSync = (redirect: boolean) => {
  const token = Cookies.get('token');
  if (redirect || !token) {
    Router.push('/login');
  }
};

export const onlyNotAuth = () => {
  const logged = useSelector((state: ApplicationState) => state.user.logged);
  if (logged) {
    Router.push('/');
  }
};
