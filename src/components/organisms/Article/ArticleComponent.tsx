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
import {
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from 'react-share';
import { FromNow } from '../../../utils/moment';
import { Article } from '../../../store/ducks/articles';
import Like from '../../atoms/Buttons/Like';
import { CommentsComponent, SimilarComponent, HeadComponent } from '..';
import { SpringModalComponent } from '../../molecules';

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

const ShareIcons = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
});

const ShareButton = styled(Box)({
  cursor: 'pointer',
  padding: '5px',
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

  const [open, setOpen] = React.useState(false);
  const [urlPage, setUrl] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Content component="div">
      <HeadComponent
        title={`${article.title} - Sou Gamer Com Orgulho`}
        description={article.resume}
        url={urlPage}
        image={imageURL}
      />
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
            <SpringModalComponent
              handleClose={handleClose}
              open={open}
              title="Compartilhar"
              text="Quer mostrar o assunto com os seus amigos? Compartilhe na sua rede social! =D"
            >
              <ShareIcons>
                <FacebookShareButton url={urlPage}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <InstapaperShareButton url={urlPage}>
                  <InstapaperIcon size={32} round />
                </InstapaperShareButton>
                <LineShareButton url={urlPage}>
                  <LineIcon size={32} round />
                </LineShareButton>
                <RedditShareButton url={urlPage}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <TelegramShareButton url={urlPage}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TumblrShareButton url={urlPage}>
                  <TumblrIcon size={32} round />
                </TumblrShareButton>
                <TwitterShareButton url={urlPage}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <ViberShareButton url={urlPage}>
                  <ViberIcon size={32} round />
                </ViberShareButton>
                <WhatsappShareButton url={urlPage}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </ShareIcons>
            </SpringModalComponent>

            <ShareButton onClick={handleOpen}>Compartilhar</ShareButton>
          </FooterCard>
        </Content>
      </Card>
      <SimilarComponent category={article.categories[0].value} />
      <CommentsComponent comments={article.comments} articleID={article.id} />
    </Content>
  );
};

export default ArticleComponent;
