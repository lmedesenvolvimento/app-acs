import { bindActionCreators } from 'redux';
import { findIndex } from 'lodash';
import Types from './types';

const clearDomicilios = {
    type: Types.SET_QUADRAS_LOGRADOUROS,
    data: []
};

function setDomicilios(data) {
    return {
        type: Types.SET_QUADRAS_LOGRADOUROS,
        data
    };
}

function addDomicilios(quadra_key, logradouro_key) {
    return {
        type: Types.ADD_QUADRAS_LOGRADOUROS,
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

export const actions = {
    clearDomicilios,
    setDomicilios,
    addDomicilios,
    destroyDomicilios
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
