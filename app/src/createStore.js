import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducers';

export default function() {
    const middlewares = [thunk];

    return createStore(Reducer, applyMiddleware(...middlewares));
}