import React from 'react';
import { useSelector } from 'react-redux';
import { ArticleComponent, CommonComponent } from '../../components/organisms';
import { ApplicationState } from '../../store';
import { ActionsList } from '../../store/ducks/articles';
import { ActionsList as CategoriesActionList } from '../../store/ducks/categories';

const Refer = () => {
  const { currentArticle } = useSelector((state: ApplicationState) => state.articles);
  return (
    <div>
      <CommonComponent>
        {currentArticle && <ArticleComponent article={currentArticle} />}
      </CommonComponent>
    </div>
  );
};

Refer.getInitialProps = async ({ store, query }) => {
  store.dispatch(ActionsList.loadArticleRequest(query.refer));
  store.dispatch(CategoriesActionList.listCategoriesRequest());
};

export default Refer;
