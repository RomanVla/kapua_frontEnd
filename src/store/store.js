import { createStore} from 'redux'
import combineReducers from '../reducers'

import applyMiddleware from './midleware'

export const store = createStore(combineReducers, applyMiddleware);
window.store = store;