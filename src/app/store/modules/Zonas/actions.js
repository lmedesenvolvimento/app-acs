import { bindActionCreators } from 'redux';
import Types from './types';
import Zona from '@/models/Zona';

function fetchZonas() {
    const data = [
        new Zona(1, 1, 'Zona 1', new Date(), new Date()),
        new Zona(2, 1, 'Zona 2', new Date(), new Date())
    ];

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
