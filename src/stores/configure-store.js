import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import createLogger from 'redux-logger';
import createSagaMiddleware, {END} from 'redux-saga';
import rootReducer from '../reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import {fromJS} from 'immutable';
import {SUPPORTED_LOCALES} from '../locales';

const logger = createLogger({
    diff: true,
    collapsed: true,
    stateTransformer: (state) => {
        return state.toJS();
    }
});


export default function configureStore (initialState, history) {
    const sagaMiddleware = createSagaMiddleware();
    const routerMiddlewareWithHistory = routerMiddleware(history);
    const immutableInitalState = fromJS(initialState);
    const immutableStateWithLanguages = immutableInitalState.setIn(['ui', 'components', 'footer', 'language', 'supportedLocales'], fromJS(SUPPORTED_LOCALES));

    const store = createStore(
        combineReducers({
            ...rootReducer,
            routing: routerReducer
        }),
        immutableStateWithLanguages,
        compose(
            applyMiddleware(
                sagaMiddleware,
                routerMiddlewareWithHistory,
                logger
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f 
        )
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}