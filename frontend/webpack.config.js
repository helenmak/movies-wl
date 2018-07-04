const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[hash].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ],
    alias: {
      api: path.resolve(__dirname, "src/api"),
      core: path.resolve(__dirname, "src/core"),
      components: path.resolve(__dirname, "src/components"),
      containerComponents: path.resolve(__dirname, "src/components/containerComponents"),
      containers: path.resolve(__dirname, "src/containers"),
      layouts: path.resolve(__dirname, "src/layouts"),
      constants: path.resolve(__dirname, "src/constants"),
      utils: path.resolve(__dirname, "src/utils"),
      actions: path.resolve(__dirname, "src/redux/actions"),
      reducers: path.resolve(__dirname, "src/redux/reducers")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // new CopyWebpackPlugin([
    //   { from: 'src/assets', to: 'assets', toType: 'dir' },
    // ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: false,
            sourceMap: true,
            minimize: false,
            comments: false
          }
        }, {
          loader: "sass-loader"
        }]
      }]
  }
};