import React from 'react';
import { Card, Box, CardMedia, CardContent, Typography, styled } from '@material-ui/core';
import moment from 'moment';
import { Article } from '../../../store/ducks/articles';
import Like from '../../atoms/Buttons/Like';
import { CommentsComponent } from '../../molecules';

const Content = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  width: '100%',
});

const Date = styled(Typography)({
  fontStyle: 'italic',
  color: '#b2b2b2',
  textAlign: 'right',
  marginTop: '5px',
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
  padding: '0px 10px 10px 10px',
});

type OwnProps = {
  article: Article;
};

const ArticleComponent = (props: OwnProps) => {
  const { article } = props;
  const articleCreatedAt = moment(article.createdAt).format('DD/MM/YYYY');
  const authorName = article.author?.name || 'Anônimo';
  const imageURL =
    article?.image ||
    'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18j48tw3csif0jpg.jpg';

  return (
    <Content component="div">
      <Card>
        <Content component="div">
          <CardContent>
            <div>
              <h3>{article.title}</h3>
              <ImageCard image={imageURL} />
              <Date>{articleCreatedAt}</Date>
            </div>
            <DescriptionArea dangerouslySetInnerHTML={{ __html: article?.content }} />
            <Author>{`Autor: ${authorName}`}</Author>
          </CardContent>
          <FooterCard component="div">
            <Like articleId={article._id} articleLikes={article.likes} />

            <div>Compartilhar</div>
          </FooterCard>
        </Content>
      </Card>
      <CommentsComponent comments={article.comments} articleID={article._id} />
    </Content>
  );
};

export default ArticleComponent;
