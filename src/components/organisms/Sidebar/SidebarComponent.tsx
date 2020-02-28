/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from 'react';
import { Card, styled, Box, Divider, CardMedia, Grid, CardActionArea } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import Link from 'next/link';
import AdSense from 'react-adsense';
import { ActionsList } from '../../../store/ducks/articles';
import { ApplicationState } from '../../../store';

const CardStyled = styled(Card)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const SocialMedia = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '20px',
  width: '100%',
});

const FacebookIconStyled = styled(FacebookIcon)({
  height: '50px',
  width: '50px',
  color: '#000',
});

const InstagramIconStyled = styled(InstagramIcon)({
  height: '50px',
  width: '50px',
  color: '#000',
});

const YouTubeIconStyled = styled(YouTubeIcon)({
  height: '50px',
  width: '50px',
  color: '#000',
});

const TwitterIconStyled = styled(TwitterIcon)({
  height: '50px',
  width: '50px',
  color: '#000',
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

const ImageCard = styled(CardMedia)({
  height: '40px',
  width: '40px',
  borderRadius: '5px',
});

const ImageContainer = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TextContainer = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  color: '#4B4B4B',
});

const FacebookContainer = styled(Box)({
  maxWidth: '340px',
  width: '100%',
  marginBottom: '20px',
});

const CardActionAreaStyled = styled(CardActionArea)({
  height: '100%',
  width: '100%',
});

const AdsArea = styled(Box)({
  width: '100%',
});

const SidebarComponent = () => {
  const dispatch = useDispatch();

  const { mostLikedInWeek, mostViewedInWeek } = useSelector(
    (state: ApplicationState) => state.articles,
  );

  useEffect(() => {
    dispatch(ActionsList.mostViewedInWeekRequest());
    dispatch(ActionsList.mostLikedInWeekRequest());
  }, []);

  return (
    <CardStyled>
      <SocialMedia>
        <a href="https://www.facebook.com/SouGamerComOrgulho/" target="_blank">
          <FacebookIconStyled />
        </a>
        <a href="https://www.instagram.com/sougamercomorgulho/">
          <InstagramIconStyled />
        </a>
        <a href="https://www.youtube.com/channel/UCEAXWgm887myU5Tg2fkhLtw">
          <YouTubeIconStyled />
        </a>
        <a href="https://twitter.com/sougamercom">
          <TwitterIconStyled />
        </a>
      </SocialMedia>
      <AdsArea>
        <AdSense.Google
          client="ca-pub-9181350088524240"
          slot="9360777014"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </AdsArea>
      {mostViewedInWeek && (
        <div style={{ width: '100%' }}>
          <BoxHeaderStyled component="div">As mais vistas da semana</BoxHeaderStyled>
          <ul style={{ listStyleType: 'none', padding: '10px 0px' }}>
            {mostViewedInWeek.map(article => {
              const imageURL =
                article?.image ||
                'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18j48tw3csif0jpg.jpg';

              return (
                <li key={article.title}>
                  <Link href="/post/[refer]" as={`/post/${article.refer}`}>
                    <CardActionAreaStyled>
                      <div style={{ margin: '10px 0px', cursor: 'pointer' }}>
                        <Grid container spacing={1}>
                          <Grid container item xs={3}>
                            <ImageContainer>
                              <ImageCard image={imageURL} />
                            </ImageContainer>
                          </Grid>
                          <Grid container item xs={9}>
                            <TextContainer>{article.title}</TextContainer>
                          </Grid>
                        </Grid>
                      </div>
                      <Divider />
                    </CardActionAreaStyled>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <FacebookContainer>
        <div
          className="fb-page"
          data-href="https://www.facebook.com/SouGamerComOrgulho/"
          data-tabs="timeline"
          data-width=""
          data-height=""
          data-small-header="true"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="false"
        >
          <blockquote
            cite="https://www.facebook.com/SouGamerComOrgulho/"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/SouGamerComOrgulho/">Sou Gamer com Orgulho</a>
          </blockquote>
        </div>
      </FacebookContainer>
      {mostLikedInWeek && (
        <div style={{ width: '100%' }}>
          <BoxHeaderStyled component="div">As mais curtidas da semana</BoxHeaderStyled>
          <ul style={{ listStyleType: 'none', padding: '10px 0px' }}>
            {mostLikedInWeek.map(article => {
              const imageURL =
                article?.image ||
                'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/18j48tw3csif0jpg.jpg';
              return (
                <li key={article.title}>
                  <Link href="/post/[refer]" as={`/post/${article.refer}`}>
                    <CardActionAreaStyled>
                      <div style={{ margin: '10px 0px', cursor: 'pointer' }}>
                        <Grid container spacing={1}>
                          <Grid container item xs={3}>
                            <ImageContainer>
                              <ImageCard image={imageURL} />
                            </ImageContainer>
                          </Grid>
                          <Grid container item xs={9}>
                            <TextContainer>{article.title}</TextContainer>
                          </Grid>
                        </Grid>
                      </div>
                      <Divider />
                    </CardActionAreaStyled>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </CardStyled>
  );
};

export default SidebarComponent;
