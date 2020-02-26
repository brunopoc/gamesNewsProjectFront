import React from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { HeaderComponent, SidebarComponent } from '..';

const Main = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const FooterContainer = styled(Box)({
  width: '100%',
  padding: '20px',
  marginTop: '10px',
  borderTop: '1px solid #BBBBBB',
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
            <SidebarComponent />
          </Grid>
        </Grid>
      </Main>
    </Container>
    <FooterContainer>Copyright © 2020 Sou Gamer Com Orgulho</FooterContainer>
  </div>
);

export default CommonComponent;
