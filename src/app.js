import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';
import rootSaga from './sagas';
import Routes from './routes';
import configureStore from './stores/configure-store';
import createHistory from 'history/createBrowserHistory';
import initLocales from './locales';
import {getActiveLanguage} from './reducers/selectors';
import { AppContainer } from 'react-hot-loader';

const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(initialState, history);
store.runSaga(rootSaga);


const render = (Routes) => ReactDOM.render(
    <AppContainer>
        <Root store={store} Routes={Routes} history={history} />
    </AppContainer>
, document.getElementById('root'));

initLocales(getActiveLanguage(store.getState()), () => render(Routes));

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        render(newRoutes);
    });
}


