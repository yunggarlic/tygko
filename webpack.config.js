// const webpack = require('webpack');

console.log(__dirname);
module.exports = {
  entry: './client/main.js',
  output: {
    path: __dirname,
    filename: './public/tygko-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader']},
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
