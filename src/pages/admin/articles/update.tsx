import React, { useEffect } from 'react';
import { WriteCardComponent } from '../../../components/organisms';
import { withAuthSync } from '../../../utils/auth';

const Update = () => {
  useEffect(() => {
    withAuthSync(false);
  }, []);

  return <WriteCardComponent />;
};

export default Update;
