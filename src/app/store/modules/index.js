import { combineReducers } from 'redux';

import Auth from './Auth';
import User from './User';
import API from './API';
import MicroAreas from './MicroAreas';
import Logradouros from './Logradouros';
import Quadras from './Quadras';
import QuadrasLogradouros from './QuadrasLogradouros';
import Domicilios from './Domicilios';
import UI from './UI';
import Individuos from './Individuos';
import Visitas from './Visitas';
import Network from './Network';

export default combineReducers({
    Auth,
    User,
    API,
    MicroAreas,
    Logradouros,
    Quadras,
    QuadrasLogradouros,
    Domicilios,
    Individuos,
    Visitas,
    Network,
    UI
});
