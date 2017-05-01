import 'babel-polyfill';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import {findAllRestaurants, uploadMockData} from './db';

const port = process.env.NODE_ENV || 8080;


const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));
app.use('/static', express.static('public'));


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
            <script src="/static/app.js"></script>
        </body>
    </html>
`);


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

app.get('/api/restaurants', function (req, res) {
    findAllRestaurants()
        .then((restaurants) => res.json(restaurants));
});


app.get('*', function (req, res) {
    res.send(layout('', initialState));
});

app.listen(port);
console.log(`Server is running on port ${port}..`);

uploadMockData();
