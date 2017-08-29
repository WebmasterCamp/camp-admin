const commonConfig = {
  isProduction: false,
  apiPath: 'http://staging.api.ywc15.ywc.in.th',
};

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
  },
  production: {
    isProduction: true,
    apiPath: 'http://api.ywc15.ywc.in.th',
  }
};

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development']
);
