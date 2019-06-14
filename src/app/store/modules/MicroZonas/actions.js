import { bindActionCreators } from 'redux';
import Types from './types';

function fetchMicroZonas(data) {
    return {
        type: Types.FETCH_MICRO_ZONAS,
        data
    };
}

function getMicroZonas() {
    return (dispatch, getState) => {
        return getState().MicroZonas.data;
    };
}

export const actions = {
    fetchMicroZonas
};

export const getters = {
    getMicroZonas
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
