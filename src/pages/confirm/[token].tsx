import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { styled } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { LoginCardComponent } from '../../components/organisms';
import Header from '../../components/organisms/Header/HeaderComponent';
import { ActionsList } from '../../store/ducks/user';
import { ApplicationState } from '../../store';
import { ActionsList as CategoriesActionList } from '../../store/ducks/categories';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingTop: '40px',
});

const MessageContainerStyled = styled(Box)({
  marginBottom: '10px',
});

const Token = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state: ApplicationState) => state.user.verifiedError);

  useEffect(() => {
    dispatch(ActionsList.confirmEmailRequest(router.query.token.toString()));
  }, []);

  return (
    <div>
      <Header />
      <Container fixed>
        <BoxStyled component="div">
          {error ? (
            <MessageContainerStyled>
              <Alert severity="error">
                Houve algum problema na verificação do seu email! Faça seu login:
              </Alert>
            </MessageContainerStyled>
          ) : (
            <MessageContainerStyled>
              <Alert severity="success">
                Email Confirmado, bem vindo ao Sou Gamer Com Orgulho! Faça seu login:
              </Alert>
            </MessageContainerStyled>
          )}
          <LoginCardComponent />
        </BoxStyled>
      </Container>
    </div>
  );
};

Token.getInitialProps = async ({ store }) => {
  store.dispatch(CategoriesActionList.listCategoriesRequest());
};

export default Token;
