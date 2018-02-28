const commonConfig = {
  isProduction: false,
  apiPath: 'https://staging.api.ywc15.ywc.in.th',
}

const environmentConfig = {
  development: {},
  staging: {
    isProduction: true,
  },
  production: {
    isProduction: true,
    apiPath: 'https://api.ywc15.ywc.in.th',
  },
}

module.exports = Object.assign(
  commonConfig,
  environmentConfig[process.env.ENV || process.env.NODE_ENV || 'development'],
)
