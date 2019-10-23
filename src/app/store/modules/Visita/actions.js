import { bindActionCreators } from 'redux';
import { findIndex, chain } from 'lodash';
import Types from './types';

const clearDomicilios = {
    type: Types.SET_DOMICILIOS,
    data: []
};

function setDomicilios(data) {
    return {
        type: Types.SET_DOMICILIOS,
        data
    };
}

function addDomicilios(data) {
    return (dispatch) => {
        dispatch({
            type: Types.ADD_DOMICILIOS,
            data
        });
    };
}

function updateDomicilios(key, data) {
    return (dispatch, getState) => {
        const domicilios = getState().Domicilios.data;
        dispatch({
            type: Types.UPDATE_DOMICILIOS,
            index: findIndex(domicilios, { key }),
            data
        });
    };
}

function destroyDomicilios(key) {
    return (dispatch, getState) => {
        const Domicilios = getState().Domicilios.data;
        dispatch({
            type: Types.DESTROY_DOMICILIOS,
            index: findIndex(Domicilios, { key })
        });
    };
}

function getDomiciliosByQuadraLogradouro(quadra_logradouro_key) {
    return (dispatch, getState) => {
        const { Domicilios } = getState();

        return chain(Domicilios.data)
            .filter({ quadra_logradouro_key })
            .orderBy('asc')
            .value();
    };
}

export const actions = {
    clearDomicilios,
    setDomicilios,
    addDomicilios,
    updateDomicilios,
    destroyDomicilios
};

export const getters = {
    getDomiciliosByQuadraLogradouro
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
