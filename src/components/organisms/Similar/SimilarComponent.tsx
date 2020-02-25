import React, { useEffect } from 'react';
import { Card, Box, styled, Grid, CardMedia, CardActionArea } from '@material-ui/core';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsList } from '../../../store/ducks/articles';
import { ApplicationState } from '../../../store';

const Content = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  width: '100%',
  marginTop: '10px',
});

const BoxHeaderStyled = styled(Box)({
  width: '100%',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 800,
  fontSize: '16px',
});

const SimilarContainer = styled(Box)({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

const SimilarTitleContainer = styled(Box)({
  fontSize: '14px',
  marginTop: '10px',
  fontWeight: 600,
});

const ImageCard = styled(CardMedia)({
  height: '200px',
  width: '100%',
  borderRadius: '5px',
});

type OwnProps = {
  category: string;
};

const SimilarComponent = (props: OwnProps) => {
  const { category } = props;
  const dispatch = useDispatch();

  const similar = useSelector((state: ApplicationState) => state.articles.similar);

  useEffect(() => {
    dispatch(ActionsList.loadSimilarArticleRequest(category));
  }, []);

  return (
    <>
      {similar && (
        <Content component="div">
          <Card>
            <BoxHeaderStyled component="div">Você também pode curtir</BoxHeaderStyled>
            <Grid container spacing={1}>
              {similar.map(article => {
                const imageURL =
                  article?.image ||
                  'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18j48tw3csif0jpg.jpg';
                return (
                  <Grid key={article.refer} container item sm={4}>
                    <Link href="/post/[refer]" as={`/post/${article.refer}`}>
                      <CardActionArea>
                        <SimilarContainer>
                          <ImageCard image={imageURL} />
                          <SimilarTitleContainer>{article.title}</SimilarTitleContainer>
                        </SimilarContainer>
                      </CardActionArea>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Content>
      )}
    </>
  );
};

export default SimilarComponent;
