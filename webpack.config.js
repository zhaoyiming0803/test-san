const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SanLoaderPlugin = require('san-loader/lib/plugin')

function resolve(dir, file = '') {
  return path.resolve(__dirname, './', dir, file)
}

class TestWebpackPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('TestWebpackPlugin', (compilation) => {
      console.log(compilation)
    })
  }
}

module.exports = {
  mode: 'none',
  entry: resolve('index.js'),
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.san', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.san$/,
        loader: 'san-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./index.html'),
      filename: 'index.html',
      env: process.env.NODE_ENV,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
    }),
    new SanLoaderPlugin(),
    new TestWebpackPlugin()
  ],
  devServer: {
    host: 'localhost',
    inline: false, // 启用热更新
    port: 3002,
    progress: true,
    contentBase: resolve('./'),
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    openPage: '../',
  },
  node: {
    fs: 'empty'
  }
}