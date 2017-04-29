import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const assetsPath = 'http://localhost:3000/static/';

const app = express();
const compiler = webpack(webpackConfig);
// app.use(webpackMiddleware(webpack(webpackConfig)), {
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: true
//     },
//
//     publicPath: webpackConfig.output.publicPath,
//
//     stats: {
//         colors: true
//     },
//     reporter: null,
//     serverSideRender: true
// });
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    // hot: true,
    // stats: {
    //
    //     colors: true
    // }
}));

app.use(webpackHotMiddleware(compiler));

// new WebpackDevServer(webpack(webpackConfig), {
//     publicPath: webpackConfig.output.publicPath,
//     hot: true,
//     historyApiFallback: true,
//     proxy: {
//         '*': 'http://localhost:3000'
//     }
// }).listen(8080, 'localhost', function(err, result) {
//     if (err) {
//         return console.log(err);
//     }
//
//     console.log('Listening at http://localhost:8080/');
// });


const layout = (body, initialState) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Special Diet</title>
            <meta name="description" content="Special Diet">
            <meta name="author" content="ZDV">
            
        </head>
        <body>
            <div id="root"><div>${body}</div></div>
            <script type="text/javascript" charset="utf-8">
              window.__INITIAL_STATE__ = ${initialState};
            </script>
            <script src="/static/bundle.js"></script>
        </body>
    </html>
`);

// app.use((req, res) => {
//     const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
//
//     // then use `assetsByChunkName` for server-sider rendering
//     // For example, if you have only one main chunk:
//
//     res.send(layout('', initialState, assetsByChunkName))
//
// });

const initialState = JSON.stringify({
    ui: {
        pages: {

        },
        components: {
            footer: {
                language: { code: 'en' }
            }
        }
    },
    domain: {}
});




app.get('*', function (req, res) {
    res.send(layout('', initialState));
});
//
// app.route('/').get(function (req, res) {
//     res.send(layout('', initialState));
// });

app.listen(8080);
console.log('Server is running on port 3000..');