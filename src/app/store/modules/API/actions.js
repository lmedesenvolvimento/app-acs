import { bindActionCreators } from 'redux';
import { actions as AuthActions } from '@redux/modules/Auth/actions';
import { actions as MicroAreasActions } from '@redux/modules/MicroAreas/actions';
import { actions as LogradourosActions } from '@redux/modules/Logradouros/actions';
import { actions as QuadrasActions } from '@redux/modules/Quadras/actions';
import { actions as QuadrasLogradourosActions } from '@redux/modules/QuadrasLogradouros/actions';
import { actions as DomiciliosActions } from '@redux/modules/Domicilios/actions';
import { actions as IndividuosActions } from '@redux/modules/Individuos/actions';
import { actions as VisitasActions } from '@redux/modules/Visitas/actions';
import { actions as UIActions } from '@redux/modules/UI/actions';

import shortid from 'shortid';
import { omit } from 'lodash';

import Localstorage from '@/services/LocalStorage';
import Http from '@/services/Http';
import { blacklist } from '@redux/index.const';

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
    };
}

function emitData(onSuccess, onFail) {
    return (dispatch, getState) => {
        const rootState = getState();
        const user = rootState.User;
        const email = user.data.email.replace(/\./g, ';');

        const data = omit(rootState, blacklist);

        Http.post('/api/v1/sync_logs', { data: { data } }).then(() => {
            Localstorage.read().then((state) => {
                // Clear old data
                state
                    .set(email, null)
                    .write()
                    .value();

                asyncFetchData(onSuccess, () => {
                    throw new Error('Falha na busca de novos dados');
                });
            });
        }).catch((error) => {
            if (error.response) {
                const { status } = error.response;
                switch (status) {
                case 403:
                    dispatch(AuthActions.signOutAsync());
                    break;
                case 422:
                    onFail(error.response.data);
                    break;
                default:
                    break;
                }
                return;
            }

            onFail({
                data: 'Error Desconhecido, por favor contacte o administrador.'
            });
        });
    };
}

function asyncFetchData(onSuccess, onFail) {
    return (dispatch, getState) => {
        const { User } = getState();
        const email = User.data.email.replace(/\./g, ';');

        Localstorage.read().then((state) => {
            const session = state.get(email).value();

            if (session) {
                persistLocalData(dispatch, session.data, result => onSuccess(result));
                return;
            }

            Http.get('/api/v1/mapeamentos').then(({ data }) => {
                persistRemoteData(dispatch, data, result => onSuccess(result));
            }).catch((err) => {
                dispatch(AuthActions.signOutAsync());
                onFail(err);
            });
        });
    };
}

function forceAsyncFetchData(onSuccess, onFail) {
    return (dispatch) => {
        dispatch(UIActions.openInteventionalModal());

        Http.get('/api/v1/mapeamentos').then(({ data }) => {
            persistRemoteData(dispatch, data, result => onSuccess(result));
        }).catch((err) => {
            dispatch(AuthActions.signOutAsync());
            onFail(err);
        }).finally(() => {
            dispatch(UIActions.closeInteventionalModal());
        });
    };
}

function persistLocalData(dispatch, data, callback) {
    // create all local key ref
    defineKeysToLocalData(data);
    // dispatch all map list to redux
    dispatch(fetchData);
    dispatch(MicroAreasActions.setMicroAreas(data.MicroAreas.data));
    dispatch(QuadrasActions.setQuadras(data.Quadras.data));
    dispatch(LogradourosActions.setLogradouros(data.Logradouros.data));
    dispatch(QuadrasLogradourosActions.setQuadrasLogradouros(data.QuadrasLogradouros.data));
    dispatch(DomiciliosActions.setDomicilios(data.Domicilios.data));
    dispatch(IndividuosActions.setIndividuos(data.Individuos.data));
    dispatch(VisitasActions.setVisitas(data.Visitas.data || []));
    callback(data);
}

function persistRemoteData(dispatch, data, callback) {
    // create all local key ref
    defineKeysToRemoteData(data);
    // dispatch all map list to redux
    dispatch(fetchData);
    dispatch(MicroAreasActions.setMicroAreas(data.microareas));
    dispatch(QuadrasActions.setQuadras(data.quadras));
    dispatch(LogradourosActions.setLogradouros(data.logradouros));
    dispatch(QuadrasLogradourosActions.setQuadrasLogradouros(data.quadra_logradouros));
    dispatch(DomiciliosActions.setDomicilios(data.domicilios));
    dispatch(IndividuosActions.setIndividuos(data.individuos));
    dispatch(VisitasActions.setVisitas(data.visitas || []));
    callback(data);
}

export const actions = {
    fetchData,
    emitData,
    asyncFetchData,
    asynClearData,
    forceAsyncFetchData
};

const defineKeysToLocalData = ({
    MicroAreas,
    Quadras,
    Logradouros,
    QuadrasLogradouros,
    Domicilios,
    Individuos,
    Visitas
}) => {
    // Define unique keys for reducers
    if (MicroAreas.data) {
        MicroAreas.data.forEach(microarea => microarea.key = shortid.generate());
    }
    if (Quadras.data) {
        Quadras.data.forEach(quadra => quadra.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadras(MicroAreas.data, Quadras.data);
    }

    if (QuadrasLogradouros.data) {
        QuadrasLogradouros.data
            .forEach(quadra_logradouro => quadra_logradouro.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadrasLogradouros(
            Logradouros.data,
            Quadras.data, QuadrasLogradouros.data
        );
    }

    if (Logradouros.data) {
        Logradouros.data
            .forEach(logradouro => logradouro.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadrasLogradouros(
            Logradouros.data,
            Quadras.data,
            QuadrasLogradouros.data
        );
    }

    if (Domicilios.data) {
        Domicilios.data.forEach(domicilio => domicilio.key = shortid.generate());

        // Combine relationship
        defineParentKeysToDomicilios(
            QuadrasLogradouros.data,
            Domicilios.data
        );
    }

    if (Individuos.data) {
        Individuos.data.forEach(individuo => individuo.key = shortid.generate());
        // Combine relationship
        defineParentKeysToIndividuos(Domicilios.data, Individuos.data);
    }

    if (Visitas.data) {
        Visitas.data.forEach(visita => visita.key = shortid.generate());
        // Combine relationship
        defineParentKeysToVisitas(Individuos.data, Visitas.data);
    }
};

const defineKeysToRemoteData = ({
    microareas,
    quadras,
    logradouros,
    quadra_logradouros,
    domicilios,
    individuos,
    visitas
}) => {
    // Define unique keys for reducers
    if (microareas) {
        microareas.forEach(microarea => microarea.key = shortid.generate());
    }
    if (quadras) {
        quadras.forEach(quadra => quadra.key = shortid.generate());

        // Combine relationship
        defineParentKeysToQuadras(microareas, quadras);
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

    if (visitas) {
        visitas.forEach(visita => visita.key = shortid.generate());
        // Combine relationship
        defineParentKeysToVisitas(individuos, visitas);
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

const defineParentKeysToVisitas = (individuos, visitas) => {
    individuos.forEach((individuo) => {
        visitas.forEach((visita) => {
            if (individuo.id === visita.individuo_id) {
                visita.individuo_key = individuo.key;
            }
        });
    });
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
