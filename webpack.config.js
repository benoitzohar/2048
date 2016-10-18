var webpack = require('webpack');
var path = require('path');

var AssetsWebpackPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var settings = {
    destDir: '/dist/'
};

var isDevServer = path.basename(require.main.filename) === 'webpack-dev-server.js';

settings.root = path.join(__dirname, path.dirname(settings.destDir));

var plugins = [
    new ExtractTextPlugin("app.css"),
    new AssetsWebpackPlugin(),
    new CleanWebpackPlugin([settings.destDir.split('/').slice(-2)[0]], {
        root: settings.root,
        versbose: true,
        dry: false
    })
];

//do not minimize when using dev server
if (!isDevServer) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }));
}

module.exports = {
  cache: true,
  context: __dirname,
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015']}},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!autoprefixer-loader!sass-loader") },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!autoprefixer-loader") },
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=images/[hash].[ext]' },
      { test: /\.html$/, include: /src/, loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname, './src') + '/!html'},
    ]
  },
  plugins: plugins
}
