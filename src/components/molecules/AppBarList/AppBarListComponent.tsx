import React from 'react';
import { MenuItemsComponent } from '..';

type OwnProps = {
  toggleDrawer: (...args: any[]) => void;
};

const AppBarListComponent = ({ toggleDrawer }: OwnProps) => {
  return (
    <div
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <MenuItemsComponent direction="vertical" />
    </div>
  );
};

export default AppBarListComponent;
