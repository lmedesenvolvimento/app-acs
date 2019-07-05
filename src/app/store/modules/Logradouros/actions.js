import { bindActionCreators } from 'redux';
import { filter, chain } from 'lodash';
import shortid from 'shortid';

import { actions as QuadrasLogradourosActions } from '@redux/modules/QuadrasLogradouros/actions';

import Types from './types';

function getLogradouros() {
    return (dispatch, getState) => {
        return getState().Logradouros.data;
    };
}

function getLogradourosByQuadra(quadra_key = 0) {
    return (dispatch, getState) => {
        const state = getState();
        return filter(state.Logradouros.data, (logradouro) => {
            const relationship = chain(state.QuadrasLogradouros.data)
                .filter({ quadra_key })
                .map(ql => ql.logradouro_key)
                .orderBy(['nome'])
                .value();

            return relationship.includes(logradouro.key);
        });
    };
}

function getLogradourosByBairroID(bairro_id = 0) {
    return (dispatch, getState) => {
        return chain(getState().Logradouros.data)
            .filter(logra => logra.bairro.id === bairro_id)
            .uniqBy('nome')
            .orderBy(['nome'])
            .value();
    };
}

function createLogradouro(logradouro, quadraKey) {
    return (dispatch) => {
        const key = shortid.generate();
        // dispacth to push new logradouro
        dispatch(addLogradouro({ key, ...logradouro }));
        // dispacth assossiation in relational list quadras_logradrouros
        dispatch(
            QuadrasLogradourosActions
                .addQuadrasLogradouros(quadraKey, key)
        );
    };
}

function addLogradouro(logradouro) {
    return {
        type: Types.ADD_LOGRADOURO,
        data: logradouro
    };
}

function setLogradouros(data) {
    return {
        type: Types.SET_LOGRADOUROS,
        data
    };
}

const clearLogradouros = {
    type: Types.SET_LOGRADOUROS,
    data: []
};

export const actions = {
    setLogradouros,
    clearLogradouros,
    createLogradouro
};

export const getters = {
    getLogradouros,
    getLogradourosByBairroID,
    getLogradourosByQuadra,
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
