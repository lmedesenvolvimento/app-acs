import { combineReducers } from 'redux';

import Counter from './Counter'
import Auth from './Auth'
import User from './User'

export default combineReducers({
    Auth,
    User,
    Counter,
});