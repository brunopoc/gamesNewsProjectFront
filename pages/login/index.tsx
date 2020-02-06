import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoginCardComponent } from '../../src/components/organisms';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const Login: React.FC = () => (
  <Container fixed>
    <BoxStyled component="div">
      <LoginCardComponent />
    </BoxStyled>
  </Container>
);

export default Login;
