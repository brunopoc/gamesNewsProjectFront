import React from 'react';
import { Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LoginForm from '../../molecules/LoginForm';

const CardStyled = styled(Card)({
  padding: '40px',
});

const LoginCard: React.FC = () => (
  <CardStyled>
    <span>Faça seu login</span>
    <LoginForm />
  </CardStyled>
);

export default LoginCard;
