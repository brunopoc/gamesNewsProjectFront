import { useSelector } from 'react-redux';
import Router from 'next/router';
import { ApplicationState } from '../store';

export const Restrict = () => {
  const logged = useSelector((state: ApplicationState) => state.login.logged);
  if (!logged) {
    Router.push('/login');
  }
};

export const onlyNotAuth = () => {
  const logged = useSelector((state: ApplicationState) => state.login.logged);
  if (logged) {
    Router.push('/');
  }
};
