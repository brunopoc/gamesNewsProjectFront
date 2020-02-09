import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsList } from '../../../store/ducks/user';
import { ApplicationState } from '../../../store';

const MainComponent: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const logged = useSelector((state: ApplicationState) => state.user.logged);
  const token = Cookies.get('token');

  if (token && logged === false) {
    dispatch(ActionsList.tokenRetrieveRequest({ token }));
  }

  return <div className="layout">{children}</div>;
};

export default MainComponent;
