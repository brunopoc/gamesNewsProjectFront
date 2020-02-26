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
import { SpringModalComponent } from '../../molecules';

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

const ShareIcons = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
});

const ShareButton = styled(Box)({
  cursor: 'pointer',
  padding: '5px',
});

type OwnProps = {
  articles: Article[];
};

const ArticlesComponent = (props: OwnProps) => {
  const { articles } = props;
  const [open, setOpen] = React.useState(false);
  const [urlPage, setUrl] = React.useState('');

  const handleOpen = (ref: string) => {
    setOpen(true);
    setUrl(`https://www.sougamercomorgulho.com.br/post/${ref}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  <ShareButton onClick={() => handleOpen(article.refer)}>Compartilhar</ShareButton>
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
