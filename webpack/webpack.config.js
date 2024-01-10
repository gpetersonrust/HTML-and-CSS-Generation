const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { MODE } = require('./library/constants/global');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
 

module.exports = {
  mode: MODE,
  entry: {
 
    code: path.resolve(__dirname, 'src', 'code', 'js', 'code.js'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname.replace('webpack', ''), 'dist'),
    filename: ({ chunk: name }) => {
      return name === 'main'
        ? '[name].js'
        : '[name]/[name].js';
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk: { name } }) => {
        return name === 'main'
          ? '[name]-wp[fullhash].css'
          : '[name]/[name]-wp[fullhash].css';
      },
    }),
  ],
  devtool: 'source-map',
};