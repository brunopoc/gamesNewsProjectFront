import React from 'react';
import { Container, Box, Grid, styled, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { UserMenuComponent, MenuItemsComponent } from '../../molecules';
import { AppBarComponent } from '..';

const Header = styled(Box)({
  width: '100%',
  height: '140px',
  backgroundColor: '#111111',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const LogoArea = styled(Box)({
  width: '320px',
  height: '10px',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
});

const MenuContainer = styled(Box)({
  width: '100%',
  backgroundColor: '#C13535',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px',
});

const HeaderComponent = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Header>
      <LogoArea>
        <img
          style={{ width: '140px', position: 'absolute', top: '0px' }}
          src="https://gameapi-upload.s3.amazonaws.com/logo.png"
          alt="Logo do site"
        />
      </LogoArea>
      <MenuContainer>
        <Container>
          <Grid container spacing={2}>
            <Grid container item xs={4} sm={8} md={9} lg={10}>
              {matches ? <MenuItemsComponent direction="horizontal" /> : <AppBarComponent />}
            </Grid>
            <Grid container item justify="flex-end" alignItems="center" xs={8} sm={4} md={3} lg={2}>
              <UserMenuComponent />
            </Grid>
          </Grid>
        </Container>
      </MenuContainer>
    </Header>
  );
};

export default HeaderComponent;
