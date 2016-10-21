var webpack = require('webpack');
var path = require('path');

var AssetsWebpackPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var settings = {
    destDir: '/dist/'
};

var isDevServer = path.basename(require.main.filename) === 'webpack-dev-server.js';

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';

settings.root = path.join(__dirname, path.dirname(settings.destDir));

var plugins = [];

if (!isTest) {
    plugins.push(new ExtractTextPlugin("app.css"));
}

plugins.push(new AssetsWebpackPlugin());
plugins.push(new CleanWebpackPlugin([settings.destDir.split('/').slice(-2)[0]], {
    root: settings.root,
    versbose: true,
    dry: false
}));


//do not minimize when using dev server
if (!isDevServer) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }
    }));
}

var preLoaders = [];
if (isTest) {
    preLoaders.push({
        test: /\.js$/,
        exclude: [
            /node_modules/,
            /\.spec\.js$/
        ],
        loader: 'isparta-loader'
    })
}

/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
var devtool;
if (isTest) {
    devtool = 'inline-source-map';
} else if (!isDevServer) {
    devtool = 'source-map';
} else {
    devtool = 'eval-source-map';
}

module.exports = {
    cache: true,
    context: __dirname,
    entry: isTest ? {} : './src/app.js',
    devtool: devtool,
    output: isTest ? {} : {
        filename: 'bundle.js',
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/"
    },
    module: {
        preLoaders: preLoaders,
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            loader: isTest ? 'null' : ExtractTextPlugin.extract("style-loader", "css-loader?minimize!autoprefixer-loader!sass-loader")
        }, {
            test: /\.css$/,
            loader: isTest ? 'null' : ExtractTextPlugin.extract("style-loader", "css-loader?minimize!autoprefixer-loader")
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=images/[hash].[ext]'
        }, {
            test: /\.html$/,
            include: /src/,
            loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname, './src') + '/!html'
        }]
    },
    plugins: plugins
}
