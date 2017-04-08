module.exports = {
  context: '/webpack/src',
  devtool: 'eval-source-map',
  entry: {
    jumpjs: [
      './index.js'
    ]
  },
  output: {
    path: '/webpack/dist',
    filename: '[name].js'
  },
  watch: true
};
