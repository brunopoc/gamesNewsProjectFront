import React from 'react';
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  styled,
  Breadcrumbs,
  Link,
  Grid,
} from '@material-ui/core';
import { FromNow } from '../../../utils/moment';
import { Article } from '../../../store/ducks/articles';
import Like from '../../atoms/Buttons/Like';
import { CommentsComponent, SimilarComponent } from '..';

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
  fontSize: '12px',
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

const TitleArea = styled(Box)({
  marginBottom: '0px',
});

const BreadcrumbsStyled = styled(Breadcrumbs)({
  marginBottom: '10px',
  marginTop: '5px',
  fontSize: '12px',
  fontWeight: 600,
});

const DataAndAuthor = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const TagsSection = styled(Box)({
  padding: '10px',
});

type OwnProps = {
  article: Article;
};

const ArticleComponent = (props: OwnProps) => {
  const { article } = props;
  const articleCreatedAt = FromNow(article.createdAt);
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
              <TitleArea component="h3">{article.title}</TitleArea>
              <BreadcrumbsStyled aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Home
                </Link>
                {article.categories.map(category => (
                  <Link key={category.value} color="inherit" href={`/category/${category.value}`}>
                    {category.label}
                  </Link>
                ))}
              </BreadcrumbsStyled>
              <ImageCard image={imageURL} />
            </div>
            <DescriptionArea dangerouslySetInnerHTML={{ __html: article?.content }} />
            <TagsSection>
              <Grid container spacing={1}>
                <Grid container item sm={6}>
                  <BreadcrumbsStyled aria-label="breadcrumb">
                    {article.tags.map(tag => (
                      <Link key={tag.value} color="inherit" href={`/tag/${tag.value}`}>
                        {tag.label}
                      </Link>
                    ))}
                  </BreadcrumbsStyled>
                </Grid>
                <Grid container item sm={6}>
                  <DataAndAuthor>
                    <Author>{`Autor: ${authorName}`}</Author>
                    <Date>{articleCreatedAt}</Date>
                  </DataAndAuthor>
                </Grid>
              </Grid>
            </TagsSection>
          </CardContent>
          <FooterCard component="div">
            <Like articleId={article.id} articleLikes={article.likes} />

            <div>Compartilhar</div>
          </FooterCard>
        </Content>
      </Card>
      <SimilarComponent category={article.categories[0].value} />
      <CommentsComponent comments={article.comments} articleID={article.id} />
    </Content>
  );
};

export default ArticleComponent;
