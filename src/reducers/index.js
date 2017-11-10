import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import elements from './elements';

const reducers = combineReducers({
    elements,
});

const logger = createLogger({
    collapsed: true
});

const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
);

export default store;
