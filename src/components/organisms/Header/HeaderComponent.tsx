import React from 'react';
import Link from 'next/link';
import { Container, Box, Grid, styled } from '@material-ui/core';
import { UserMenuComponent } from '../../molecules';

const Header = styled(Box)({
  width: '100%',
  height: '140px',
  backgroundColor: '#111111',
  display: 'flex',
  alignItems: 'flex-end',
});

const MenuContainer = styled(Box)({
  width: '100%',
  backgroundColor: '#C13535',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px',
});

const MenuListStyled = styled(Box)({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
});

const MenuItemStyled = styled(Box)({
  float: 'left',
  padding: '14px 16px',
  color: '#fff',
  fontWeight: 700,
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color .2s, color .2s',
  '&:hover': {
    color: '#000',
  },
});

const HeaderComponent = () => {
  return (
    <Header>
      <MenuContainer>
        <Container>
          <Grid container spacing={2}>
            <Grid container item md={10}>
              <MenuListStyled component="ul">
                <Link href="/">
                  <MenuItemStyled component="li">Home</MenuItemStyled>
                </Link>
                <MenuItemStyled component="li">PC</MenuItemStyled>
                <MenuItemStyled component="li">Xbox One</MenuItemStyled>
                <MenuItemStyled component="li">PS4</MenuItemStyled>
                <MenuItemStyled component="li">Nintendo Switch</MenuItemStyled>
                <MenuItemStyled component="li">Arcade</MenuItemStyled>
                <MenuItemStyled component="li">Animes</MenuItemStyled>
                <MenuItemStyled component="li">Outros</MenuItemStyled>
              </MenuListStyled>
            </Grid>
            <Grid container item justify="flex-end" alignItems="center" md={2}>
              <UserMenuComponent />
            </Grid>
          </Grid>
        </Container>
      </MenuContainer>
    </Header>
  );
};

export default HeaderComponent;
