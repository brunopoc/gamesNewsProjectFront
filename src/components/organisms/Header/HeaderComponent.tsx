import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Button, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ActionsList } from '../../../store/ducks/login';
import { ApplicationState } from '../../../store';

const Header = styled(Box)({
  width: '100%',
  height: '140px',
  backgroundColor: '#111111',
  display: 'flex',
  alignItems: 'flex-end',
});

const Menu = styled(Box)({
  width: '100%',
  backgroundColor: '#C13535',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px',
});

const MenuList = styled(Box)({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
});

const MenuItem = styled(Box)({
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

const ColorButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#111111',
  '&:hover': {
    backgroundColor: '#1B1B1B',
  },
});

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state: ApplicationState) => state.login.logged);
  const token = Cookies.get('token');
  if (token) {
    dispatch(ActionsList.loginSuccess({ token }));
  }
  return (
    <Header>
      <Menu>
        <Container>
          <Grid container spacing={2}>
            <Grid container item md={8}>
              <MenuList component="ul">
                <Link href="/">
                  <MenuItem component="li">Home</MenuItem>
                </Link>
                <MenuItem component="li">PC</MenuItem>
                <MenuItem component="li">Xbox One</MenuItem>
                <MenuItem component="li">PS4</MenuItem>
                <MenuItem component="li">Nintendo Switch</MenuItem>
                <MenuItem component="li">Arcade</MenuItem>
                <MenuItem component="li">Animes</MenuItem>
                <MenuItem component="li">Outros</MenuItem>
              </MenuList>
            </Grid>
            <Grid container item justify="flex-end" alignItems="center" md={4}>
              {!logged ? (
                <Link href="/login">
                  <ColorButton variant="contained">Faça seu login</ColorButton>
                </Link>
              ) : (
                <ColorButton
                  variant="contained"
                  onClick={() => {
                    Cookies.remove('token');
                    dispatch(ActionsList.logoutRequest());
                  }}
                >
                  Sair
                </ColorButton>
              )}
            </Grid>
          </Grid>
        </Container>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
