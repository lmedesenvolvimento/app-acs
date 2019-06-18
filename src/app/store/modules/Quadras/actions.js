import { bindActionCreators } from 'redux';
import Types from './types';

const clearQuadras = {
    type: Types.SET_QUADRAS,
    data: []
};

function setQuadras(data) {
    return {
        type: Types.SET_QUADRAS,
        data
    };
}

function getQuadras() {
    return (dispatch, getState) => {
        return getState().Quadras.data;
    };
}

export const actions = {
    setQuadras,
    clearQuadras
};

export const getters = {
    getQuadras
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
