// const webpack = require('webpack');

module.exports = {
  entry: './client/main.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']},
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
