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

function addDomicilios(quadra_key, logradouro_key) {
    return {
        type: Types.ADD_DOMICILIOS,
        data: { quadra_key, logradouro_key }
    };
}
function destroyDomicilios(quadra_key, logradouro_key) {
    return (dispatch, getState) => {
        const Domicilios = getState().Domicilios.data;
        return {
            type: Types.DESTROY_QUADRAS_LOGRADOUROS,
            index: findIndex(Domicilios, { quadra_key, logradouro_key })
        };
    };
}

function getDomiciliosByQuadraLogradouro(quadra_logradrouro_key) {
    return (dispatch, getState) => {
        const state = getState();
        return chain(state.Domicilios.data)
            .filter({ quadra_logradrouro_key })
            .orderBy('asc')
            .value();
    };
}

export const actions = {
    clearDomicilios,
    setDomicilios,
    addDomicilios,
    destroyDomicilios
};

export const getters = {
    getDomiciliosByQuadraLogradouro
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
