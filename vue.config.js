module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
      disableHostCheck: true,
      proxy: process.env.VUE_APP_API_URL
  }
};
