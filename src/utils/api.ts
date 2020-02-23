const prodConfig = {
  publicRuntimeConfig: {
    API_ENDPOINT: 'https://sou-gamer-com-orgulho-back.herokuapp.com/api/v1',
  },
};

const devConfig = {
  publicRuntimeConfig: {
    API_ENDPOINT: 'http://localhost:4000/api/v1',
  },
};

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
