import React from 'react';
import Head from 'next/head';

type HeadProps = {
  title: string;
};

export default ({ title }: HeadProps) => (
  <Head key={title}>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1.0, width=device-width, shrink-to-fit=no"
    />
    <meta httpEquiv="Content-Language" content="pt-br, pt" />
    <title>{title}</title>
  </Head>
);
