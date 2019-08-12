import { bindActionCreators } from 'redux';
import { findIndex, filter, chain } from 'lodash';
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
    console.log('addDomicilios', data);
    return (dispatch) => {
        dispatch({
            type: Types.ADD_DOMICILIOS,
            data
        });
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
    destroyDomicilios
};

export const getters = {
    getDomiciliosByQuadraLogradouro
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
