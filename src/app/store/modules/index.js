import { combineReducers } from 'redux';

import Counter from './Counter'
import Auth from './Auth'

export default combineReducers({
    Auth,
    Counter,
});