import { bindActionCreators } from 'redux';

import localStorage from '@/services/LocalStorage';

import Types from './types';

function fetchAsyncMappings() {
    return async (dispatch, getState) => {
        const db = await localStorage.read();
        const user = getState().User.data;
        if (!user) return;
        const { mappings } = db.get(`users.${user.key}`).omit(['public_areas']).value();
        const action = fetchMappings(mappings);
        dispatch(action);
    };
}

function fetchMappings(data) {
    return {
        type: Types.FETCH_MAPPINGS,
        data
    };
}

function getMappings() {
    return (dispatch, getState) => {
        return getState().Mappings.data;
    };
}

export const actions = {
    fetchAsyncMappings,
    fetchMappings
};

export const getters = {
    getMappings
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
