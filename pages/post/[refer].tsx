import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ArticleComponent, CommonComponent } from '../../src/components/organisms';
import { ApplicationState } from '../../src/store';
import { ActionsList } from '../../src/store/ducks/articles';

const Refer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentArticle } = useSelector((state: ApplicationState) => state.articles);
  useEffect(() => {
    dispatch(ActionsList.loadArticleRequest(router.query.refer));
  }, []);

  return (
    <div>
      <CommonComponent>
        {currentArticle && <ArticleComponent article={currentArticle} />}
      </CommonComponent>
    </div>
  );
};

export default Refer;
