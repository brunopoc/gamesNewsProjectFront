import React from 'react';
import Link from 'next/link';
import { Box, styled } from '@material-ui/core';

const MenuListStyled = styled(Box)({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
});

const MenuItemStyledHorizontal = styled(Box)({
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

const MenuItemStyledVertical = styled(Box)({
  padding: '14px 16px',
  color: '#000',
  fontWeight: 700,
  cursor: 'pointer',
  borderRadius: '5px',
});

type OwnProps = {
  direction: string;
};

const AppBarListComponent = ({ direction }: OwnProps) => {
  return (
    <MenuListStyled component="ul">
      {direction === 'horizontal' ? (
        <>
          <Link href="/">
            <MenuItemStyledHorizontal component="li">Home</MenuItemStyledHorizontal>
          </Link>
          <MenuItemStyledHorizontal component="li">PC</MenuItemStyledHorizontal>
          <MenuItemStyledHorizontal component="li">Xbox One</MenuItemStyledHorizontal>
          <MenuItemStyledHorizontal component="li">PS4</MenuItemStyledHorizontal>
          <MenuItemStyledHorizontal component="li">Nintendo Switch</MenuItemStyledHorizontal>
          <MenuItemStyledHorizontal component="li">Arcade</MenuItemStyledHorizontal>
          <MenuItemStyledHorizontal component="li">Animes</MenuItemStyledHorizontal>
          <MenuItemStyledHorizontal component="li">Outros</MenuItemStyledHorizontal>
        </>
      ) : (
        <>
          <Link href="/">
            <MenuItemStyledVertical component="li">Home</MenuItemStyledVertical>
          </Link>
          <MenuItemStyledVertical component="li">PC</MenuItemStyledVertical>
          <MenuItemStyledVertical component="li">Xbox One</MenuItemStyledVertical>
          <MenuItemStyledVertical component="li">PS4</MenuItemStyledVertical>
          <MenuItemStyledVertical component="li">Nintendo Switch</MenuItemStyledVertical>
          <MenuItemStyledVertical component="li">Arcade</MenuItemStyledVertical>
          <MenuItemStyledVertical component="li">Animes</MenuItemStyledVertical>
          <MenuItemStyledVertical component="li">Outros</MenuItemStyledVertical>
        </>
      )}
    </MenuListStyled>
  );
};

export default AppBarListComponent;
