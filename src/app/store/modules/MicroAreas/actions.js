import { bindActionCreators } from 'redux';
import Types from './types';

const clearMicroAreas = {
    type: Types.SET_MICROAREAS,
    data: []
};

function setMicroAreas(data) {
    return {
        type: Types.SET_MICROAREAS,
        data
    };
}

function getMicroAreas() {
    return (dispatch, getState) => {
        return getState().MicroAreas.data;
    };
}

export const actions = {
    setMicroAreas,
    clearMicroAreas
};

export const getters = {
    getMicroAreas
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
