import { bindActionCreators } from 'redux';
import { filter } from 'lodash';
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

function getQuadrasByMicroareaID(micro_area_id) {
    return (dispatch, getState) => {
        return filter(getState().Quadras.data, { micro_area_id });
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
