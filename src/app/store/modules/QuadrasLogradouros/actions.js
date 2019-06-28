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

export const actions = {
    clearQuadrasLogradouros,
    setQuadrasLogradouros
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
