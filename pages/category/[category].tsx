import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { ArticlesComponent, CommonComponent } from '../../src/components/organisms';
import { ApplicationState } from '../../src/store';
import { ActionsList } from '../../src/store/ducks/articles';
import { ActionsList as CategoriesActionList } from '../../src/store/ducks/categories';

const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list, currentPage, totalOfPages } = useSelector(
    (state: ApplicationState) => state.articles,
  );

  const handlePageClick = data => {
    const selected = data.selected + 1;
    dispatch(ActionsList.articleListRequestByCategory(selected, router.query.category.toString()));
  };
  const initPage = currentPage - 1;
  return (
    <div>
      <CommonComponent>
        <Grid container item md={12}>
          <ArticlesComponent articles={list} />
        </Grid>
        <Grid container item md={12}>
          <ReactPaginate
            previousLabel="Anterior"
            nextLabel="Próximo"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalOfPages}
            initialPage={initPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </Grid>
      </CommonComponent>
      <style jsx global>
        {`
          .pagination {
            display: inline-block;
            padding-left: 15px;
            padding-right: 15px;
            margin: 40px auto;
          }

          .pagination li {
            display: inline-block;
            background-color: #000;
            padding: 15px 0px;
            margin: 5px;
            color: #fff;
            border-radius: 5px;
          }
          .pagination li a {
            padding: 15px;
            margin: 5px;
          }
          .pagination li a:hover {
            cursor: pointer;
          }
          .pagination .active {
            background-color: #fff;
            color: #000;
            border: 1px solid #000;
          }
        `}
      </style>
    </div>
  );
};

Category.getInitialProps = async ({ store, query }) => {
  store.dispatch(ActionsList.articleListRequestByCategory(1, query.category.toString()));
  store.dispatch(CategoriesActionList.listCategoriesRequest());
};

export default Category;
