module.exports = {
  css: { 
    extract: false, 
    loaderOptions: {
      scss: {
        additionalData:  '@import "~vuetify/src/styles/styles.sass";'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
