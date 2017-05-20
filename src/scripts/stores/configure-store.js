import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';

const logger = createLogger({
    diff: true,
    collapsed: true,
    stateTransformer: (state) => {
        return state.toJS();
    }
});


export default function configureStore(initialState, history) {
    const sagaMiddleware = createSagaMiddleware();
    const routerMiddlewareWithHistory = routerMiddleware(history);
    const immutableInitalState = fromJS(initialState);

    const devTools = history && window && window.devToolsExtension ? window.devToolsExtension() : f => f;

    const store = createStore(
        combineReducers({
            ...rootReducer,
            routing: routerReducer
        }),
        immutableInitalState,
        compose(
            applyMiddleware(
                sagaMiddleware,
                routerMiddlewareWithHistory,
                logger
            ),
            devTools
        )
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}