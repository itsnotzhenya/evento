const { env } = process

module.exports = {
  publicPath: env.NODE_ENV === 'production' ? '/admin' : '/',
  devServer: {
    port: 8181,
    host: env.VUE_APP_HOST,
    proxy: {
      [env.VUE_APP_API_PATH]: {
        target: env.VUE_APP_TARGET,
        ws: true,
        changeOrigin: true
      },
      [env.VUE_APP_UPLOADS_PATH]: {
        target: env.VUE_APP_TARGET,
        ws: true,
        changeOrigin: true
      },
      [env.VUE_APP_TOKEN_PATH]: {
        target: env.VUE_APP_TARGET,
        changeOrigin: true
      }
    }
  }
}
