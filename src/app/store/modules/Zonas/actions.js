import { bindActionCreators } from 'redux';

import Types from './types';

function fetchZonas(data) {
    return {
        type: Types.FETCH_ZONAS,
        data
    };
}

function getZonas() {
    return (dispatch, getState) => {
        return getState().Zonas.data;
    };
}

export const actions = {
    fetchZonas
};

export const getters = {
    getZonas
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
