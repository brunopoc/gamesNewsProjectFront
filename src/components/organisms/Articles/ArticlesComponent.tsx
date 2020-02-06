import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Grid, Card, Box, CardMedia, CardContent, Typography } from '@material-ui/core';
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
  textAlign: 'right',
  marginTop: '5px',
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
});

const ImageCard = styled(CardMedia)({
  height: '200px',
  borderRadius: '5px',
});

const DescriptionArea = styled(CardMedia)({
  padding: '0px 10px 10px 10px',
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

const ArticlesComponent = (props: OwnProps) => {
  const { articles } = props;
  return (
    <Grid container spacing={3}>
      {articles.map(article => (
        <Grid item lg={6} key={article.id}>
          <Card>
            <Content component="div">
              <CardContent>
                <div>
                  <h3>{article.title}</h3>
                  <ImageCard image={article.image} />
                  <Date>{article.createdAt}</Date>
                </div>
                <DescriptionArea>{article.resume}</DescriptionArea>
                <Author>{`Autor: ${article.author.name}`}</Author>
                <FooterCard component="div">
                  <Like component="div">
                    <FavoriteBorderIcon />
                    {article.likes}
                  </Like>
                  <Comments>{`${article.commentsCount} Comentários`}</Comments>
                  <div>Compartilhar</div>
                </FooterCard>
              </CardContent>
            </Content>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticlesComponent;
