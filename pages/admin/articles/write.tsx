import React from 'react';
import { WriteCardComponent } from '../../../src/components/organisms';
import { withAuthSync } from '../../../src/utils/auth';

const Write = () => {
  withAuthSync(false);
  return <WriteCardComponent />;
};

export default Write;
