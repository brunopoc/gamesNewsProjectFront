/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as Sentry from '@sentry/node';
import { NextPageContext } from 'next';
import Error, { ErrorProps as NextErrorProps } from 'next/error';
import React from 'react';

const NRNError = (props: NRNErrorProps): JSX.Element => {
  const { statusCode, isSSRReadyToRender, err, children = null } = props;

  if (!isSSRReadyToRender && err) {
    Sentry.captureException(err);
  }

  return <>{children || <Error statusCode={statusCode} />}</>;
};

NRNError.getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { res, err, asPath } = props;
  // @ts-ignore
  const errorInitialProps: ErrorProps = await Error.getInitialProps({ res, err });

  errorInitialProps.isSSRReadyToRender = true;

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404, isSSRReadyToRender: true };
    }

    if (err) {
      Sentry.captureException(err);

      return errorInitialProps;
    }
  } else {
    if (err) {
      Sentry.captureException(err);

      return errorInitialProps;
    }
  }

  Sentry.captureException(
    // @ts-ignore
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );

  return errorInitialProps;
};

export declare type NRNErrorProps = {
  err: Error;
  statusCode: number;
  isSSRReadyToRender: boolean;
  children?: React.ReactElement;
};

export declare type ErrorProps = {
  isSSRReadyToRender: boolean;
} & NextErrorProps;

export default NRNError;
