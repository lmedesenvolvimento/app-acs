import { bindActionCreators } from 'redux';
import { findIndex, chain } from 'lodash';
import Types from './types';

const clearIndividuos = {
    type: Types.SET_INDIVIDUOS,
    data: []
};

function setIndividuos(data) {
    return {
        type: Types.SET_INDIVIDUOS,
        data
    };
}

function addIndividuo(data) {
    return (dispatch) => {
        dispatch({
            type: Types.ADD_INDIVIDUOS,
            data
        });
    };
}

function updateIndividuo(key, data) {
    return (dispatch, getState) => {
        const individuos = getState().Individuos.data;
        dispatch({
            type: Types.UPDATE_INDIVIDUOS,
            index: findIndex(individuos, { key }),
            data
        });
    };
}

function destroyIndividuo(key) {
    return (dispatch, getState) => {
        const individuos = getState().Individuos.data;
        dispatch({
            type: Types.DESTROY_INDIVIDUOS,
            index: findIndex(individuos, { key })
        });
    };
}

function getIndividuosByDomicilio(domicilio_key) {
    return (dispatch, getState) => {
        const { Individuos } = getState();

        return chain(Individuos.data)
            .filter({ domicilio_key })
            .orderBy('asc')
            .value();
    };
}

export const actions = {
    clearIndividuos,
    setIndividuos,
    addIndividuo,
    updateIndividuo,
    destroyIndividuo,
};

export const getters = {
    getIndividuosByDomicilio
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);