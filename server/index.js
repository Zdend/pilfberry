import 'babel-polyfill';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import { uploadMockData } from './db';
import { PUBLIC_ROUTES } from './routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import routes from './routes';
import { Strategy } from 'passport-local';
import { User } from './db/schema';
import { ROOT_PATH } from './config';

const port = process.env.NODE_ENV || 8080;


const app = express();
const compiler = webpack(webpackConfig);
const webpackDevMiddlewareInitialized = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
        colors: true
    }
});

morgan.token('body', req => req && JSON.stringify(req.body));

app.use(webpackDevMiddlewareInitialized);
app.use(webpackHotMiddleware(compiler));
app.use('/static', express.static('public'));
app.use('/files', express.static(ROOT_PATH));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(':method :url :response-time :body'));
app.use(helmet());
app.use(session({
    secret: 'Silvitko is a secret agent Choco',
    resave: false,
    saveUninitialized: false,
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
