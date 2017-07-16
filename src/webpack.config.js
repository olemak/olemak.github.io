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
         test: /\.scss|.css$/,
         use: [
           'style-loader',
           { loader: 'css-loader', options: { importLoaders: 1 } },
           'postcss-loader'
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