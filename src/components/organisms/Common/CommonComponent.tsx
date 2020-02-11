import React from 'react';
import { Container, Box, Grid, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { HeaderComponent } from '..';

const Main = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const CardStyled = styled(Card)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const CommonComponent = ({ children }) => (
  <div className="commonArea">
    <HeaderComponent />
    <Container fixed>
      <Main>
        <Grid container spacing={2}>
          <Grid container item md={8}>
            {children}
          </Grid>
          <Grid container item md={4}>
            <CardStyled> - Assuntos em Alta - </CardStyled>
          </Grid>
        </Grid>
      </Main>
    </Container>
  </div>
);

export default CommonComponent;
