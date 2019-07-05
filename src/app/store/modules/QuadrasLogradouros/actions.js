import { bindActionCreators } from 'redux';
import Types from './types';

const clearQuadrasLogradouros = {
    type: Types.SET_QUADRAS_LOGRADOUROS,
    data: []
};

function setQuadrasLogradouros(data) {
    return {
        type: Types.SET_QUADRAS_LOGRADOUROS,
        data
    };
}

function addQuadrasLogradouros(quadra_key, logradouro_key) {
    return {
        type: Types.ADD_QUADRAS_LOGRADOUROS,
        data: { quadra_key, logradouro_key }
    };
}

export const actions = {
    clearQuadrasLogradouros,
    setQuadrasLogradouros,
    addQuadrasLogradouros
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
