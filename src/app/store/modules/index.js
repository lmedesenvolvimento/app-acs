import { combineReducers } from 'redux';

import Auth from './Auth';
import User from './User';
import Loading from './Loading';
import API from './API';
import Quadras from './Quadras';
import MicroAreas from './MicroAreas';
import Logradouros from './Logradouros';

export default combineReducers({
    Auth,
    User,
    Loading,
    API,
    Quadras,
    MicroAreas,
    Logradouros
});
