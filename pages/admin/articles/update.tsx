import React, { useEffect } from 'react';
import { WriteCardComponent } from '../../../src/components/organisms';
import { withAuthSync } from '../../../src/utils/auth';

const Update = () => {
  useEffect(() => {
    withAuthSync(false);
  }, []);

  return <WriteCardComponent />;
};

export default Update;
