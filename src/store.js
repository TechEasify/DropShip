import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './modules/combineReducer';

const middlewares = [thunk];

export default createStore(rootReducer, applyMiddleware(...middlewares));
