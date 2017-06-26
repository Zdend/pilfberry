import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';
import rootSaga from './sagas';
import Routes from './routes';
import configureStore from './stores/configure-store';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import { fromJS } from 'immutable';
import { reviveServerState } from './transformers';

const initialState = reviveServerState(window.__INITIAL_STATE__);
delete window.__INITIAL_STATE__;

const history = createHistory();
const store = configureStore(initialState, history);
store.runSaga(rootSaga);

const render = (Routes) => ReactDOM.render(
    <AppContainer>
        <Root store={store} Routes={Routes} history={history} dynamicRoutes={initialState.getIn(['routes', 'dynamicRoutes'])} />
    </AppContainer>
    , document.getElementById('root'));

render(Routes);
// Hot Module Replacement API
if (module.hot) {

    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        render(newRoutes);
    });
}


