import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy } from 'passport-local';
import compression from 'compression';
import favicon from 'serve-favicon';
import webpackConfig from '../webpack.config';
import { uploadMockData } from './db';
import routes from './routes';
import { User } from './db/schema';
import { ROOT_PATH, CONNECTION_URL, SERVER_PORT, isDev } from './config';

const MongoStore = require('connect-mongo')(session);

const port = process.env.port || SERVER_PORT;

mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URL);

const app = express();
const compiler = webpack(webpackConfig);

morgan.token('body', req => req && JSON.stringify(req.body));

if (isDev) {
    const webpackDevMiddlewareInitialized = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        stats: {
            colors: true
        }
    });

    app.use(webpackDevMiddlewareInitialized);
    app.use(webpackHotMiddleware(compiler));
}

if (!isDev) {
    app.use(compression());
}
app.use('/static', express.static('public'));
app.use('/static', express.static('build'));
app.use(favicon(path.join('public', 'favicon', 'favicon.ico')));
app.use('/files', express.static(ROOT_PATH));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(':method :url :response-time :body'));
app.use(helmet());
app.use(session({
    secret: 'Silvitko is a secret agent Choco',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };
}

passport.authenticationMiddleware = authenticationMiddleware;


passport.use(new Strategy(
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


routes(app);

app.listen(port);
console.log(`Server is running on port ${port}..`);

uploadMockData();
