import { combineReducers } from 'redux';

import Auth from './Auth';
import User from './User';
import Loading from './Loading';
import MicroZonas from './MicroZonas';

export default combineReducers({
    Auth,
    User,
    Loading,
    MicroZonas
});
