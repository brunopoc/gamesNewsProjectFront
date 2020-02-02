import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Grid, Card, Box, CardMedia, CardHeader, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const Content = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});

const Like = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const Date = styled(Typography)({
  fontStyle: 'italic',
  color: '#b2b2b2',
});

const Comments = styled(Typography)({
  color: '#b2b2b2',
  cursor: 'pointer',
});

const Author = styled(Typography)({
  fontStyle: 'italic',
  color: '#b2b2b2',
  cursor: 'pointer',
});

interface Author {
  name: string;
  id: number;
}

interface Article {
  id: number;
  createdAt: string;
  title: string;
  author: Author;
  resume: string;
  likes: number;
  commentsCount: number;
  image: string;
}

type OwnProps = {
  articles: Article[];
};

const Articles: React.FC<OwnProps> = props => {
  const { articles } = props;
  return (
    <Grid container spacing={3}>
      {articles.map(article => (
        <Grid item xs={4} key={article.id}>
          <Card>
            <div>
              <CardMedia image={article.image} />
            </div>
            <Content component="div">
              <CardHeader>
                <h3>{article.title}</h3>
                <Date>{article.createdAt}</Date>
              </CardHeader>
              <CardContent>{article.resume}</CardContent>
              <CardContent>
                <Like component="div">
                  <FavoriteBorderIcon />
                  {article.likes}
                </Like>
                <Comments>{`${article.commentsCount} Comentários`}</Comments>
                <Author>{`Autor: ${article.author.name}`}</Author>
              </CardContent>
            </Content>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;
