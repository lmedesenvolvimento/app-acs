import { bindActionCreators } from 'redux';
import { filter } from 'lodash';
import Types from './types';

function getLogradouros() {
    return (dispatch, getState) => {
        return getState().Logradouros.data;
    };
}

function getLogradourosByQuadra(quadra_key = 0) {
    return (dispatch, getState) => {
        return filter(getState().Logradouros.data, { quadra_key });
    };
}

function getLogradourosByBairroID(bairro_id = 0) {
    return (dispatch, getState) => {
        return filter(getState().Logradouros.data, { bairro_id });
    };
}

export const actions = {
    setLogradouros(data) {
        return {
            type: Types.SET_LOGRADOUROS,
            data
        };
    },
    clearLogradouro: {
        type: Types.SET_LOGRADOUROS,
        data: []
    }
};

export const getters = {
    getLogradouros,
    getLogradourosByBairroID,
    getLogradourosByQuadra,
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
