import React from 'react';
import { Button } from '@material-ui/core';

const Send: React.FC = ({ children }) => {
  return <Button type="submit">{children}</Button>;
};

export default Send;
