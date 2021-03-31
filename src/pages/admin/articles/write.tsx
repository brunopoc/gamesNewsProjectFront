import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WriteCardComponent } from '../../../components/organisms';
import { withAuthSync } from '../../../utils/auth';
import { ActionsList } from '../../../store/ducks/articles';

const Write = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    withAuthSync(false);
  }, []);

  dispatch(
    ActionsList.loadEditableArticle({
      title: '',
      refer: '',
      content: '',
      id: '',
    }),
  );
  return <WriteCardComponent />;
};

export default Write;
