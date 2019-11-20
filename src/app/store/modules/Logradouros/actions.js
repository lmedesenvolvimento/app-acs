import { bindActionCreators } from 'redux';

import {
    filter,
    find,
    findIndex,
    omit,
    chain
} from 'lodash';

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

function getQuadraLogradouro(quadra_key = 0, logradouro_key = 0) {
    return (dispatch, getState) => {
        const state = getState();
        return chain(state.QuadrasLogradouros.data)
            .find({ quadra_key, logradouro_key })
            .value();
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

function createLogradouro(quadra, logradouro) {
    return (dispatch) => {
        if (!logradouro.key) {
            logradouro.key = shortid.generate();

            dispatch(
                addLogradouro({ key: logradouro.key, ...logradouro })
            );
        }

        // dispacth assossiation in relational list quadras_logradrouros
        dispatch(
            QuadrasLogradourosActions
                .addQuadrasLogradouros(quadra, logradouro)
        );
    };
}

function addLogradouro(logradouro) {
    return {
        type: Types.ADD_LOGRADOURO,
        data: logradouro
    };
}

function updateLogradouro(quadra_logradouro_key, { logradouro, quadra }) {
    return (dispatch, getState) => {
        const logradouros = getState().Logradouros.data;
        const quadra_key = quadra.key;
        const quadrasLogradouros = getState().QuadrasLogradouros.data;
        const quadraLogradouro = find(quadrasLogradouros, { key: quadra_logradouro_key });
        const oldLogra = find(logradouros, { key: quadraLogradouro.logradouro_key });

        // Se o novo logradouro já existir no servidor
        if (logradouro.id && quadra_key) {
            const payload = {
                key: quadraLogradouro.key,
                quadra,
                quadra_key,
                logradouro,
                logradouro_key: logradouro.key
            };

            if (!oldLogra.id) {
                dispatch(
                    destroyLogradouro(oldLogra)
                );
            }

            dispatch(
                QuadrasLogradourosActions
                    .updateQuadrasLogradouros(quadra_logradouro_key, payload)
            );

            return;
        }
        // Se logradrouro sincronizado existir e o nome for modificado é preservado
        // o logradouro e uma novo referencia é criada
        if (oldLogra.id) {
            // Deletando relação entre logradouro e quadra
            dispatch(
                QuadrasLogradourosActions
                    .destroyQuadrasLogradouros(quadra_logradouro_key)
            );
            // Criando novo logradouro e nova referências
            dispatch(
                createLogradouro(
                    quadra,
                    omit(logradouro, ['key'])
                )
            );
        } else {
            const data = Object.assign({}, oldLogra, logradouro);
            dispatch({
                type: Types.UPDATE_LOGRADOURO,
                index: findIndex(logradouros, { key: data.key }),
                data
            });
        }
    };
}

function destroyLogradouro(logradouro, quadra_logradouro_key) {
    return (dispatch, getState) => {
        const logradouros = getState().Logradouros.data;
        if (quadra_logradouro_key) {
            dispatch(
                QuadrasLogradourosActions.destroyQuadrasLogradouros(quadra_logradouro_key)
            );
        }
        dispatch({
            type: Types.DESTROY_LOGRADOURO,
            index: findIndex(logradouros, { key: logradouro.key })
        });
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
    createLogradouro,
    updateLogradouro,
    destroyLogradouro
};

export const getters = {
    getLogradouros,
    getLogradourosByBairroID,
    getLogradourosByQuadra,
    getQuadraLogradouro
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
