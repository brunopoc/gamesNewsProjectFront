import React from 'react';
import { Card, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { RegisterFormComponent } from '../../molecules';

const BoxStyled = styled(Box)({
  padding: '20px',
});

const BoxHeaderStyled = styled(Box)({
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 800,
  fontSize: '18px',
});

const RegisterCardComponent: React.FC = () => (
  <Card>
    <BoxHeaderStyled component="div">
      Crie uma conta e faça parte da nossa comunidade!
    </BoxHeaderStyled>
    <BoxStyled>
      <RegisterFormComponent />
    </BoxStyled>
  </Card>
);

export default RegisterCardComponent;
