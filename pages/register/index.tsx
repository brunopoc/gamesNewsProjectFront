import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { RegisterCardComponent } from '../../src/components/organisms';
import Header from '../../src/components/organisms/Header/HeaderComponent';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const Register: React.FC = () => (
  <div>
    <Header />
    <Container fixed>
      <BoxStyled component="div">
        <RegisterCardComponent />
      </BoxStyled>
    </Container>
  </div>
);

export default Register;
