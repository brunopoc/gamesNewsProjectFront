/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

type HeadProps = {
  title: string;
  description: string;
  url: string;
  image: string;
};

export default ({ title, description, url, image }: HeadProps) => {
  const GA_TRACKING_ID = 'UA-159166241-1';
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Head key={title}>
      {loaded && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
                `,
            }}
          />
        </>
      )}
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1.0, width=device-width, shrink-to-fit=no"
      />
      <meta httpEquiv="Content-Language" content="pt-br, pt" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Games, Gamer, Nintendo, Playstation, Xbox, Xbox One, vídeogames, jogos, multplataforma, Super Mario, Mario, Luigi, Sonic, Metroid, Zelda, CoD, BF, Battlefield, Xbox 360, Playstation one, Playstation 1"
      />
      <meta name="subject" content="Tudo sobre o mundo dos jogos!" />
      <meta name="copyright" content="Sou Gamer Com Orgulho" />
      <meta name="robots" content="index,follow" />
      <meta name="revised" content="Wednesday, February 26th, 2020, 5:00 pm" />
      <meta name="Classification" content="Jogos" />
      <meta name="author" content="Bruno Cabral, suporte@sougamercomorgulho.com.br" />
      <meta name="reply-to" content="suporte@sougamercomorgulho.com.br" />
      <meta name="owner" content="Bruno Cabral" />
      <meta name="url" content={url} />
      <meta name="category" content="Games" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Cache-Control" content="no-cache" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="games" />
      <meta property="og:image" content={image.replace(/^https:\/\//i, 'http://')} />
      <meta property="og:image:url" content={image.replace(/^https:\/\//i, 'http://')} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:alt" content={`image = ${title}`} />
      <meta property="og:site_name" content="Sou Gamer Com Orgulho" />
      <meta property="og:description" content={description} />
      <meta itemProp="image" content={image} />
      <meta name="tweetmeme-title" content={title} />
    </Head>
  );
};
