const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const PUBLIC_PATH = '/static/';

const config = {
    dev: true,
    watch: true
};

module.exports = {
        devtool: 'cheap-module-eval-source-map',
        context: __dirname,
        entry: {

            // 'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
            // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            //'webpack/hot/dev-server',
            // 'webpack-hot-middleware/client',
            bundle: [
                'babel-polyfill',
                'react-hot-loader/patch',
                'webpack-hot-middleware/client',
                './src/scripts/app.js'
            ],
            // app: './src/styles/app.scss',
            // vendor: './src/styles/vendor.scss'

            // './src/vendor.js'
        },
            // vendor: [
            //     `./src/vendor.js`,
            //     'react',
            //     'react-bootstrap',
            //     'react-dom',
            //     'react-redux',
            //     'react-router-dom',
            //     'react-router-redux',
            //     'redux',
            //     'redux-immutable',
            //     'redux-logger',
            //     'redux-saga',
            //     'reselect',
            //     'axios',
            //     'babel-polyfill',
            //     'history',
            //     'immutable',
            //     'i18next',
            //     'moment'
            // ]
        output: {
            path: path.join(__dirname, 'build'),
            filename: '[name].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: PUBLIC_PATH
        },

        // devServer: {
        //     host: 'localhost',
        //     historyApiFallback: true,
        //     hot: true,
        //     // enable HMR on the server
        //
        //     contentBase: path.resolve(__dirname, 'build'),
        //     // match the output path
        //
        //     publicPath: PUBLIC_PATH,
        //     // match the output `publicPath`
        //     port: 3000
        // },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.scss'],
            modules: [
                path.join(__dirname, 'src'),
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: exts('jpeg', 'jpg', 'png', 'gif'),
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                },
                {
                    test: exts('js', 'jsx'),
                    loaders: ['react-hot-loader/webpack', 'babel-loader'],
                    exclude: /node_modules/
                },
                makeStyleLoader(config)
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            // new ExtractTextPlugin({
            //     filename: '[name].css',
            //     allChunks: true
            // }),
            new webpack.DefinePlugin({
                __DEVELOPMENT__: config.dev,
                __DEVTOOLS__: config.dev,
                'process.env': {
                    'NODE_ENV': config.dev ? JSON.stringify('development') : JSON.stringify('production')
                }
            })
        ],
        watch: config.dev
    };





function makeStyleLoader(config) {
    return {
        test: exts('scss'),
        // use: ExtractTextPlugin.extract({
        use: [
                {
                    loader: 'style-loader',
                    options: {
                        minimize: !config.dev
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        minimize: !config.dev
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer({browsers: ['> 5%', 'ie 9']})]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.resolve(__dirname, 'node_modules')],
                        precision: 10
                    }
                }
            ]
    };
}
function exts(...extensions) {
    const extRegexString = '\\.(' + extensions.join('|') + ')$';
    return new RegExp(extRegexString)
}