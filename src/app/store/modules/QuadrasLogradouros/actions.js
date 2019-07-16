import { bindActionCreators } from 'redux';
import { findIndex } from 'lodash';
import shortid from 'shortid';
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
        data: { quadra_key, logradouro_key, key: shortid.generate() }
    };
}

function updateQuadrasLogradouros(quadra_logradouro_key, data) {
    return (dispatch, getState) => {
        const quadrasLogradouros = getState().QuadrasLogradouros.data;
        dispatch({
            type: Types.UPDATE_QUADRAS_LOGRADOUROS,
            index: findIndex(quadrasLogradouros, { key: quadra_logradouro_key }),
            data
        });
    };
}

function destroyQuadrasLogradouros(quadra_logradouro_key) {
    return (dispatch, getState) => {
        const quadrasLogradouros = getState().QuadrasLogradouros.data;
        dispatch({
            type: Types.DESTROY_QUADRAS_LOGRADOUROS,
            index: findIndex(quadrasLogradouros, { quadra_logradouro_key })
        });
    };
}

export const actions = {
    clearQuadrasLogradouros,
    setQuadrasLogradouros,
    addQuadrasLogradouros,
    updateQuadrasLogradouros,
    destroyQuadrasLogradouros
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
