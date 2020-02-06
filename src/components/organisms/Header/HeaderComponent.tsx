import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Button,
  Grid,
  Avatar,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from '@material-ui/core';
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

const ColorButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#111111',
  '&:hover': {
    backgroundColor: '#1B1B1B',
  },
});

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state: ApplicationState) => state.login.logged);
  const token = Cookies.get('token');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpenRef = useRef(open);
  if (token) {
    dispatch(ActionsList.loginSuccess({ token }));
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  useEffect(() => {
    if (prevOpenRef.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpenRef.current = open;
  }, [open]);

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
              {!logged ? (
                <Link href="/login">
                  <ColorButton variant="contained">Faça seu login</ColorButton>
                </Link>
              ) : (
                <div style={{ float: 'unset' }}>
                  <Avatar ref={anchorRef} onClick={handleToggle} />
                  <div>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    Cookies.remove('token');
                                    dispatch(ActionsList.logoutRequest());
                                  }}
                                >
                                  Sair
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </MenuContainer>
    </Header>
  );
};

export default HeaderComponent;
