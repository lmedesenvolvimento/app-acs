import { bindActionCreators } from 'redux';
import { actions as AuthActions } from '@redux/modules/Auth/actions';
import { actions as MicroAreasActions } from '@redux/modules/MicroAreas/actions';
import { actions as LogradourosActions } from '@redux/modules/Logradouros/actions';
import { actions as QuadrasActions } from '@redux/modules/Quadras/actions';
import { actions as QuadrasLogradourosActions } from '@redux/modules/QuadrasLogradouros/actions';

import shortid from 'shortid';

import Http from '@/services/Http';

import Types from './types';

const fetchData = {
    type: Types.FETCH_DATA,
};

const clearData = {
    type: Types.CLEAR_DATA
};

function asynClearData() {
    return (dispatch) => {
        dispatch(clearData);
        dispatch(QuadrasActions.clearQuadras);
        dispatch(QuadrasLogradourosActions.clearQuadrasLogradouros);
        dispatch(MicroAreasActions.clearMicroAreas);
        dispatch(LogradourosActions.clearLogradouro);
    };
}

function asyncFetchData(onSuccess, onFail) {
    return (dispatch) => {
        Http.get('/api/v1/mapeamentos').then(({ data }) => {
            // create all local key ref
            defineKeysToData(data);
            // dispatch all map list to redux
            dispatch(fetchData);
            dispatch(MicroAreasActions.setMicroAreas(data.microareas));
            dispatch(QuadrasActions.setQuadras(data.quadras));
            dispatch(LogradourosActions.setLogradouros(data.logradouros));
            dispatch(QuadrasLogradourosActions.setQuadrasLogradouros(data.quadra_logradouros));
            onSuccess(data);
        }).catch((err) => {
            dispatch(AuthActions.signOutAsync());
            onFail(err);
        });
    };
}

export const actions = {
    fetchData,
    asyncFetchData,
    asynClearData
};

const defineKeysToData = ({
    microareas,
    quadras,
    logradouros,
    quadra_logradouros
}) => {
    // Define unique keys for reducers
    microareas
        .forEach(microarea => microarea.key = shortid.generate());
    quadras
        .forEach(quadra => quadra.key = shortid.generate());
    quadra_logradouros
        .forEach(quadra_logradouro => quadra_logradouro.key = shortid.generate());
    logradouros
        .forEach(logradouro => logradouro.key = shortid.generate());
    // Combine relationship
    defineParentKeysToQuadras(microareas, quadras);
    defineParentKeysToQuadrasLogradouros(logradouros, quadras, quadra_logradouros);
};

const defineParentKeysToQuadras = (microareas, quadras) => {
    microareas.forEach((microarea) => {
        quadras.forEach((quadra) => {
            if (quadra.microarea_id === microarea.id) {
                quadra.microarea_key = microarea.key;
            }
            return quadra;
        });
    });
};

const defineParentKeysToQuadrasLogradouros = (logradouros, quadras, quadra_logradouros) => {
    logradouros.forEach((logra) => {
        quadra_logradouros.forEach((quadra_logradouro) => {
            const { logradouro } = quadra_logradouro;
            if (logradouro.id === logra.id) {
                quadra_logradouro.logradouro_key = logra.key;
            }
        });
    });

    quadras.forEach((q) => {
        quadra_logradouros.forEach((quadra_logradouro) => {
            const { quadra } = quadra_logradouro;
            if (quadra.id === q.id) {
                quadra_logradouro.quadra_key = q.key;
            }
        });
    });
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
