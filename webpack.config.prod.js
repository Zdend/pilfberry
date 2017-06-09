const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const PUBLIC_PATH = '/static/';

const config = {
    dev: false,
    watch: false
};

module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: {
        app: [
            './src/styles/app.scss',
            './src/scripts/app.js'
        ],
        vendor: [
            './src/styles/vendor.scss',
            'babel-polyfill',
            './src/scripts/vendor.js',
            'react',
            'react-bootstrap',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'react-router-redux',
            'react-google-maps',
            'react-tagsinput',
            'react-autosuggest',
            'react-input-autosize',
            'redux',
            'redux-immutable',
            'redux-logger',
            'redux-saga',
            'reselect',
            'axios',
            'history',
            'immutable',
            'i18next',
            'moment'
        ]

    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: PUBLIC_PATH
    },

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
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            makeStyleLoader(config)
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name].js' }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};





function makeStyleLoader(config) {
    return {
        test: exts('scss'),
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer({ browsers: ['> 5%', 'ie 9'] })]
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
        })
    };
}
function exts(...extensions) {
    const extRegexString = '\\.(' + extensions.join('|') + ')$';
    return new RegExp(extRegexString);
}