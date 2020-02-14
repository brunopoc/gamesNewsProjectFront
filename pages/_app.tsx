import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from '../src/store';
import { MainComponent, HeadComponent } from '../src/components/organisms';

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

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <MainComponent>
          <HeadComponent title="Sou Gamer Com Orgulho" />
          <CssBaseline />
          <Component {...pageProps} />
        </MainComponent>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
