import { combineReducers } from 'redux';

import Auth from './Auth';
import User from './User';
import Loading from './Loading';
import API from './API';
import MicroAreas from './MicroAreas';
import Logradouros from './Logradouros';
import Quadras from './Quadras';
import QuadrasLogradouros from './QuadrasLogradouros';
import UI from './UI';

export default combineReducers({
    Auth,
    User,
    Loading,
    API,
    MicroAreas,
    Logradouros,
    Quadras,
    QuadrasLogradouros,
    UI,
});
