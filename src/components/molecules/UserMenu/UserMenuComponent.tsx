import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {
  Avatar,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  styled,
  Button,
} from '@material-ui/core';
import { ActionsList } from '../../../store/ducks/user';
import { ApplicationState } from '../../../store';

const ColorButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#111111',
  '&:hover': {
    backgroundColor: '#1B1B1B',
  },
});

const UserMenuComponent = () => {
  const logged = useSelector((state: ApplicationState) => state.user.logged);
  const avatar = useSelector((state: ApplicationState) => state.user.data.data.avatar) || '';
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpenRef = useRef(open);
  const dispatch = useDispatch();

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
    <div>
      {!logged ? (
        <Link href="/login">
          <ColorButton variant="contained">Faça seu login</ColorButton>
        </Link>
      ) : (
        <div style={{ float: 'unset' }}>
          <Avatar
            ref={anchorRef}
            onClick={handleToggle}
            src={avatar}
            alt="Menu com a foto de perfil"
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <div>
                        <Link href="/admin/profile">
                          <MenuItem>Meu Perfil</MenuItem>
                        </Link>
                      </div>
                      <div>
                        <Link href="/admin/articles/write">
                          <MenuItem>Escrever Um Artigo</MenuItem>
                        </Link>
                      </div>
                      <MenuItem
                        onClick={() => {
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
      )}
    </div>
  );
};

export default UserMenuComponent;
