import { bindActionCreators } from 'redux';
import Types from './types';

function fetchMicroAreas(data) {
    return {
        type: Types.FETCH_MICRO_ZONAS,
        data
    };
}

function getMicroAreas() {
    return (dispatch, getState) => {
        return getState().MicroAreas.data;
    };
}

export const actions = {
    fetchMicroAreas
};

export const getters = {
    getMicroAreas
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
