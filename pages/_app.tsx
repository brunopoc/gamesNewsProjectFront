import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from '../src/store';

interface OwnProps {
  Component: React.Component;
  store: any;
}

class MyApp extends App<OwnProps> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <div className="layout">
          <CssBaseline />
          <Component {...pageProps} />
        </div>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
