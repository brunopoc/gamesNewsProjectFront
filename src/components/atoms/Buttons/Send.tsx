import React from 'react';
import { Button, styled } from '@material-ui/core';

const ColorButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#000000',
  '&:hover': {
    backgroundColor: '#1C1C1C',
  },
});

const Send: React.FC = ({ children }) => {
  return (
    <ColorButton variant="contained" color="primary" type="submit">
      {children}
    </ColorButton>
  );
};

export default Send;
