import { bindActionCreators } from 'redux';
import { findIndex, chain } from 'lodash';
import Types from './types';

const clearVisitas = {
    type: Types.SET_VISITAS,
    data: []
};

function setVisitas(data) {
    return {
        type: Types.SET_VISITAS,
        data
    };
}

function addVisita(data) {
    return (dispatch) => {
        dispatch({
            type: Types.ADD_VISITA,
            data
        });
    };
}

function updateVisita(key, data) {
    return (dispatch, getState) => {
        const domicilios = getState().Domicilios.data;
        dispatch({
            type: Types.UPDATE_VISITA,
            index: findIndex(domicilios, { key }),
            data
        });
    };
}

function getVisitasByIndividuo(individuo_key) {
    return (dispatch, getState) => {
        const { Visitas } = getState();

        return chain(Visitas.data)
            .filter({ individuo_key })
            .value();
    };
}

export const actions = {
    clearVisitas,
    setVisitas,
    addVisita,
    updateVisita
};

export const getters = {
    getVisitasByIndividuo
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
