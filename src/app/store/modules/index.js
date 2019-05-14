import { combineReducers } from 'redux';

import Auth from './Auth';
import User from './User';
import Loading from './Loading';

export default combineReducers({
    Auth,
    User,
    Loading,
});