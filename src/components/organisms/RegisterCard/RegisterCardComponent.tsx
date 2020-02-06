import React from 'react';
import { Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { RegisterFormComponent } from '../../molecules';

const CardStyled = styled(Card)({
  padding: '20px',
});

const RegisterCardComponent: React.FC = () => (
  <CardStyled>
    <span>Cria uma Conta e faça parte da nossa comunidade!</span>
    <RegisterFormComponent />
  </CardStyled>
);

export default RegisterCardComponent;
