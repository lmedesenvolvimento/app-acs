import { bindActionCreators } from 'redux';
import Types from './types';

function setMicroAreas(data) {
    return {
        type: Types.SET_MICROAREAS,
        data
    };
}

function getMicroAreas() {
    return (dispatch, getState) => {
        const data = getState().MicroAreas.data;
        return data;
    };
}

export const actions = {
    setMicroAreas
};

export const getters = {
    getMicroAreas
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
