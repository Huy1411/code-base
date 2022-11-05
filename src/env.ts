const env = {
  siteName: process.env.REACT_APP_SITE_NAME ?? '',
  domain: process.env.REACT_APP_DOMAIN_NAME ?? '',
  rootUrl: process.env.REACT_APP_ROOT_URL ?? '',
  api: {
    baseUrl: {
      ecoService: process.env.REACT_APP_ECO_SERVICE_BASE_URL ?? '',
    },
  },
  cookie: {
    domain: process.env.REACT_APP_COOKIE_DOMAIN ?? '',
  },
};

export default env;
