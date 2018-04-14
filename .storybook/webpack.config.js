const path = require("path");

module.exports = {
  resolve: {
    alias: {
      'src':
        path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
};