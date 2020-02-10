import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, Box, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Router from 'next/router';
import { ApplicationState } from '../../../store';
import { RetrieveData } from '../../../utils/auth';
import { ActionsList } from '../../../store/ducks/message';

const LoadCard = styled(Box)({
  zIndex: 9999,
  position: 'fixed',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, .2)',
});

const MainComponent: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const logged = useSelector((state: ApplicationState) => state.user.logged);
  const load = useSelector((state: ApplicationState) => state.message.load) || false;
  const success = useSelector((state: ApplicationState) => state.message.success) || false;
  RetrieveData(logged);

  Router.onRouteChangeStart = () => dispatch(ActionsList.loadRequest());
  Router.onRouteChangeComplete = () => dispatch(ActionsList.loadReady());

  return (
    <>
      {load === true && (
        <LoadCard>
          <CircularProgress />
        </LoadCard>
      )}
      <Snackbar open={success}>
        <MuiAlert severity="success" elevation={6} variant="filled">
          Tudo ocorreu com sucesso!
        </MuiAlert>
      </Snackbar>
      <div className="layout">{children}</div>
    </>
  );
};

export default MainComponent;
