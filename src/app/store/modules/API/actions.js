import { bindActionCreators } from 'redux';
import { actions as AuthActions } from '@redux/modules/Auth/actions';
import { actions as MicroAreasActions } from '@redux/modules/MicroAreas/actions';
import { actions as LogradourosActions } from '@redux/modules/Logradouros/actions';
import { actions as QuadrasActions } from '@redux/modules/Quadras/actions';
import { actions as QuadrasLogradourosActions } from '@redux/modules/QuadrasLogradouros/actions';
import { actions as DomiciliosActions } from '@redux/modules/Domicilios/actions';
import { actions as IndividuosActions } from '@redux/modules/Individuos/actions';

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
    return async (dispatch) => {
        dispatch(clearData);
        dispatch(QuadrasActions.clearQuadras);
        dispatch(MicroAreasActions.clearMicroAreas);
        dispatch(LogradourosActions.clearLogradouros);
        dispatch(DomiciliosActions.clearDomicilios);
        dispatch(QuadrasLogradourosActions.clearQuadrasLogradouros);
        dispatch(DomiciliosActions.clearDomicilios);
        dispatch(IndividuosActions.clearIndividuos);
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
            dispatch(DomiciliosActions.setDomicilios(data.domicilios));
            dispatch(IndividuosActions.setIndividuos(data.individuos));
            onSuccess(data);
        }).catch((err) => {
            console.warn(err);
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
    quadra_logradouros,
    domicilios,
    individuos
}) => {
    // Define unique keys for reducers
    if (microareas) {
        microareas.forEach(microarea => microarea.key = shortid.generate());
    }
    if (quadras) {
        quadras.forEach(quadra => quadra.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadras(microareas, quadras)
    }

    if (quadra_logradouros) {
        quadra_logradouros
            .forEach(quadra_logradouro => quadra_logradouro.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadrasLogradouros(logradouros, quadras, quadra_logradouros);
    }

    if (logradouros) {
        logradouros
            .forEach(logradouro => logradouro.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadrasLogradouros(logradouros, quadras, quadra_logradouros);
    }

    if (domicilios) {
        domicilios.forEach(domicilio => domicilio.key = shortid.generate());

        // Combine relationship
        defineParentKeysToDomicilios(quadra_logradouros, domicilios);
    }

    if (individuos) {
        individuos.forEach(individuo => individuo.key = shortid.generate());
        // Combine relationship
        defineParentKeysToIndividuos(domicilios, individuos);
    }
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

const defineParentKeysToDomicilios = (quadras_logradouros, domicilios) => {
    quadras_logradouros.forEach((quadra_logradouro) => {
        domicilios.forEach((domicilio) => {
            if (domicilio.quadra_logradouro_id === quadra_logradouro.id) {
                domicilio.quadra_logradouro_key = quadra_logradouro.key;
            }
        });
    });
};

const defineParentKeysToIndividuos = (domicilios, individuos) => {
    domicilios.forEach((domicilio) => {
        individuos.forEach((individuo) => {
            if (domicilio.id === individuo.domicilio_id) {
                individuo.domicilio_key = domicilio.key;
            }
        });
    });
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
