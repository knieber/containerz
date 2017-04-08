module.exports = {
  entry: './app/index.js',
  output: {
    filename: "bundle.js",
    path: __dirname + "/public/js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}