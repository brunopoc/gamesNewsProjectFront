import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoginCardComponent } from '../../src/components/organisms';
import Header from '../../src/components/organisms/Header/HeaderComponent';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const Login: React.FC = () => (
  <div>
    <Header />
    <Container fixed>
      <BoxStyled component="div">
        <LoginCardComponent />
      </BoxStyled>
    </Container>
  </div>
);

export default Login;
