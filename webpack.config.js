const path = require('path');

module.exports = {
  entry: {
    main: './lib/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: "/public/",
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.js?$/, exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  }
};
