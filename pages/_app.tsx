/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as Sentry from '@sentry/node';
import createStore from '../src/store';
import { MainComponent } from '../src/components/organisms';

Sentry.init({
  // dsn: process.env.SENTRY_DSN,
  dsn: 'https://f7e218c5499343a1ac3b3f51cabacd1f@o382569.ingest.sentry.io/5211603',
});

interface OwnProps {
  Component: React.Component;
  store: any;
  err?: any;
}

class MyApp extends App<OwnProps> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, store, err } = this.props;

    const modifiedPageProps = { ...pageProps, err };

    return (
      <Provider store={store}>
        <MainComponent>
          <CssBaseline />
          <Component {...modifiedPageProps} />
        </MainComponent>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
