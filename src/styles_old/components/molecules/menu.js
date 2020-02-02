import styled from 'styled-components';

export const Menu = styled.div`
  width: 100%;
  height: 50px;
  background-color: #C13535;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
`;

export const MenuContainer = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const MenuList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const MenuItem = styled.li`
  float: left;
  padding: 14px 16px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color .2s;
  transition: color .2s;
  &:hover {
    color: #000;
  }
`;

export const MenuButton = styled.button`
  max-width: 200px;
  width: 100%;
  background-color: #fff;
  font-weight: 800;
  color: #C13535;
  text-transform: uppercase;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  border-style: unset;
  border-radius: 5px;
  &:hover, &:focus {
    outline: unset;
    border-style: unset;
  }
  &:hover {
    background-color: #F15656;
    color: #fff;
  }
  &:active {
    border-style: unset;
    background-color: #A12A2A;
    color: #fff;
  }
`;
