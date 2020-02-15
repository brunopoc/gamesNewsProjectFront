import React from 'react';
import {
  Grid,
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Link from 'next/link';
import { FromNow } from '../../../utils/moment';
import { Article } from '../../../store/ducks/articles';
import Like from '../../atoms/Buttons/Like';

const Content = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  minHeight: '480px',
  width: '100%',
});

const Comments = styled(Typography)({
  color: '#b2b2b2',
  cursor: 'pointer',
});

const Author = styled(Typography)({
  fontStyle: 'italic',
  color: '#b2b2b2',
  textAlign: 'right',
  fontSize: '12px',
});

const FooterCard = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '5px 16px 24px 16px',
});

const ImageCard = styled(CardMedia)({
  height: '200px',
  borderRadius: '5px',
});

const DescriptionArea = styled(Box)({
  padding: '10px',
});

type OwnProps = {
  articles: Article[];
};

const ArticlesComponent = (props: OwnProps) => {
  const { articles } = props;
  return (
    <Grid container spacing={3}>
      {articles.map(article => {
        const articleCreatedAt = FromNow(article.createdAt);
        const authorName = article.author?.name || 'Anônimo';
        const imageURL =
          article?.image ||
          'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18j48tw3csif0jpg.jpg';
        return (
          <Grid item lg={6} key={article.id} style={{ width: '100%' }}>
            <Card>
              <Content component="div">
                <CardActionArea>
                  <Link href="/post/[refer]" as={`/post/${article.refer}`}>
                    <CardContent>
                      <div>
                        <h3>{article.title}</h3>
                        <ImageCard image={imageURL} />
                      </div>
                      <DescriptionArea>{article?.resume}</DescriptionArea>
                      <Author>{`Autor: ${authorName} - ${articleCreatedAt}`}</Author>
                    </CardContent>
                  </Link>
                </CardActionArea>
                <FooterCard component="div">
                  <Like articleId={article.id} articleLikes={article.likes} />
                  <Link href="/post/[refer]" as={`/post/${article.refer}#comments`}>
                    <Comments>{`${article?.comments.length} Comentários`}</Comments>
                  </Link>
                  <div>Compartilhar</div>
                </FooterCard>
              </Content>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ArticlesComponent;
