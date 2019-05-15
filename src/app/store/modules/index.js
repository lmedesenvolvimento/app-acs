import { combineReducers } from 'redux';

import Auth from './Auth';
import User from './User';
import Loading from './Loading';
import Mappings from './Mappings';
import PublicAreas from './PublicAreas';

export default combineReducers({
    Auth,
    User,
    Loading,
    Mappings,
    PublicAreas 
});