import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

import thunk from 'redux-thunk';

const logger = store => next => action => {
    console.group('logger')
    console.debug("stado actual", store.getState());
    console.debug('accion', action);
    const result = next(action);
    console.debug("stado nuevo", store.getState());
    console.groupEnd('logger')
    
    return result;
}

const store = createStore(
    reducer, 
    applyMiddleware(
        logger,
        thunk,
    ))


export default store;