var path = require('path');

  module.exports = {
    entry: './entry.js',
    externals: ['contentful'],
    devServer: {
      contentBase: '../'
    },
    output: {
      filename: '../scripts.js',
      path: path.resolve(__dirname)
    },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
          test: /\.jsx?$/,
          exclude: /(node_modules|public\/)/,
          loader: "babel-loader",
          query: {
              presets: ['react']
          }
      }
     ]
   }
  };