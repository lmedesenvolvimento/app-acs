import { bindActionCreators } from 'redux';
import { chain, orderBy } from 'lodash';
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
        return orderBy(getState().Quadras.data, ['nome']);
    };
}

function getQuadrasByMicroareaID(microarea_key) {
    return (dispatch, getState) => {
        return chain(getState().Quadras.data)
            .filter({ microarea_key })
            .orderBy(['nome'])
            .value();
    };
}

export const actions = {
    setQuadras,
    clearQuadras
};

export const getters = {
    getQuadras,
    getQuadrasByMicroareaID
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
