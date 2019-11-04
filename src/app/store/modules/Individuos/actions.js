import { bindActionCreators } from 'redux';
import { findIndex, chain, last } from 'lodash';

import Types from './types';

const clearIndividuos = {
    type: Types.SET_INDIVIDUOS,
    data: []
};

function setIndividuos(data) {
    return {
        type: Types.SET_INDIVIDUOS,
        data
    };
}

function addIndividuo(data) {
    return (dispatch) => {
        dispatch({
            type: Types.ADD_INDIVIDUOS,
            data
        });
    };
}

function updateIndividuo(key, data) {
    return (dispatch, getState) => {
        const individuos = getState().Individuos.data;
        dispatch({
            type: Types.UPDATE_INDIVIDUOS,
            index: findIndex(individuos, { key }),
            data
        });
    };
}

function destroyIndividuo(key) {
    return (dispatch, getState) => {
        const individuos = getState().Individuos.data;
        dispatch({
            type: Types.DESTROY_INDIVIDUOS,
            index: findIndex(individuos, { key })
        });
    };
}

function getIndividuo(key) {
    return (dispatch, getState) => {
        const { Individuos } = getState();

        return chain(Individuos.data)
            .find({ key })
            .value();
    };
}

function getIndividuosByDomicilio(domicilio_key) {
    return (dispatch, getState) => {
        const { Individuos } = getState();

        return chain(Individuos.data)
            .filter({ domicilio_key })
            .orderBy('asc')
            .value();
    };
}

function getNotVisitedIndividuos(domicilio_key) {
    return (dispatch, getState) => {
        const { Individuos, Visitas } = getState();

        return chain(Individuos.data)
            .filter({ domicilio_key })
            .filter(individuo => notVisitedFilter(individuo, Visitas))
            .map(individuo => injectLastVisitInIndividuo(individuo, Visitas))
            .value();
    };
}

function getVisitedIndividuos(domicilio_key) {
    return (dispatch, getState) => {
        const { Individuos, Visitas } = getState();

        return chain(Individuos.data)
            .filter({ domicilio_key })
            .filter(individuo => visitedFilter(individuo, Visitas))
            .map(individuo => injectLastVisitInIndividuo(individuo, Visitas))
            .value();
    };
}

function injectLastVisitInIndividuo(individuo, Visitas) {
    const visitas = Visitas.data.filter(visita => visita && visita.individuo_key === individuo.key);

    if (!visitas.length) {
        return individuo;
    }

    individuo.visita = { total: visitas.length, ...last(visitas) };

    return individuo;
}

function notVisitedFilter(individuo, Visitas) {
    const visitas = Visitas.data.filter(visita => visita && visita.individuo_key === individuo.key);

    if (!visitas.length) {
        return true;
    }

    return last(visitas).desfecho !== 'visita_realizada';
}

function visitedFilter(individuo, Visitas) {
    const visitas = Visitas.data.filter(visita => visita && visita.individuo_key === individuo.key);

    if (visitas.length === 0) {
        return false;
    }

    return last(visitas).desfecho === 'visita_realizada';
}

export const actions = {
    clearIndividuos,
    setIndividuos,
    addIndividuo,
    updateIndividuo,
    destroyIndividuo,
};

export const getters = {
    getIndividuo,
    getIndividuosByDomicilio,
    getVisitedIndividuos,
    getNotVisitedIndividuos
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);
