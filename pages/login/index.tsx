import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoginCardComponent } from '../../src/components/organisms';
import Header from '../../src/components/organisms/Header/HeaderComponent';
import { ActionsList as CategoriesActionList } from '../../src/store/ducks/categories';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const Login = () => (
  <div>
    <Header />
    <Container fixed>
      <BoxStyled component="div">
        <LoginCardComponent />
      </BoxStyled>
    </Container>
  </div>
);

Login.getInitialProps = async ({ store }) => {
  store.dispatch(CategoriesActionList.listCategoriesRequest());
};

export default Login;
