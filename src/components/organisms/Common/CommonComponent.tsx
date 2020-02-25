import React from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { HeaderComponent, SidebarComponent } from '..';

const Main = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
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
  </div>
);

export default CommonComponent;
