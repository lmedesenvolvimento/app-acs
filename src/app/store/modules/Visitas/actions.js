import { bindActionCreators } from 'redux';

import {
    find,
    findIndex,
    chain,
    omit
} from 'lodash';

import shortid from 'shortid';
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
        const visitas = getState().Visitas.data;
        const oldVisita = find(visitas, { key });

        if (oldVisita.desfecho !== data.desfecho) {
            dispatch({
                type: Types.ADD_VISITA,
                data: Object.assign({}, omit(data, ['total', 'key']), { key: shortid.generate() })
            });

            return;
        }

        dispatch({
            type: Types.UPDATE_VISITA,
            index: findIndex(visitas, { key }),
            data: omit(data, ['total'])
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
