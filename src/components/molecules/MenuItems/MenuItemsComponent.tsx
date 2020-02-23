import React from 'react';
import Link from 'next/link';
import { Box, styled } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';

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
  const { list } = useSelector((state: ApplicationState) => state.categories);

  return (
    <MenuListStyled component="ul">
      {direction === 'horizontal' ? (
        <>
          <Link href="/">
            <MenuItemStyledHorizontal component="li">Home</MenuItemStyledHorizontal>
          </Link>
          {list.map(category => (
            <Link key={category.value} href={`/category/${category.value}`}>
              <MenuItemStyledHorizontal key={category.value} component="li">
                {category.label}
              </MenuItemStyledHorizontal>
            </Link>
          ))}
        </>
      ) : (
        <>
          <Link href="/">
            <MenuItemStyledVertical component="li">Home</MenuItemStyledVertical>
          </Link>
          {list.map(category => (
            <Link key={category.value} href={`/category/${category.value}`}>
              <MenuItemStyledVertical key={category.value} component="li">
                {category.label}
              </MenuItemStyledVertical>
            </Link>
          ))}
        </>
      )}
    </MenuListStyled>
  );
};

export default AppBarListComponent;
