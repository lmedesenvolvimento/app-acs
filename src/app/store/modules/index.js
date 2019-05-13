import { combineReducers } from 'redux';

import Counter from './Counter';
import Auth from './Auth';
import User from './User';
import Loading from './Loading';

export default combineReducers({
    Auth,
    User,
    Counter,
    Loading,
});