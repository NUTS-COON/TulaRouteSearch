const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require("webpack");

const clientConfig = {
  entry: {
    'hack.client' : ["babel-polyfill", "./src/main/client/client.js"],
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.(png|jpg|gif|jpeg|pdf|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(xml|txt|html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    }),
      new webpack.DefinePlugin({
          SERVER: false
      })
  ]
};

const serverConfig = {
  entry: ["babel-polyfill", "./src/main/server/server.js"],
  target: 'node',
  output: {
    path: path.resolve(__dirname, "server"),
    filename: "hack.server.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg|pdf|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(xml|txt|html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
      }
    ]
  },
    plugins: [
        new webpack.DefinePlugin({
            SERVER: true
        })
    ]
};

module.exports = [clientConfig, serverConfig];