import { bindActionCreators } from 'redux';
import { actions as AuthActions } from '@redux/modules/Auth/actions';
import { actions as MicroAreasActions } from '@redux/modules/MicroAreas/actions';
import { actions as LogradourosActions } from '@redux/modules/Logradouros/actions';
import { actions as QuadrasActions } from '@redux/modules/Quadras/actions';

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
        dispatch(MicroAreasActions.clearMicroAreas);
        dispatch(LogradourosActions.clearLogradouro);
    };
}

function asyncFetchData(onSuccess, onFail) {
    return (dispatch) => {
        Http.get('/api/v1/mapeamentos/query').then(({ data }) => {
            dispatch(fetchData);
            dispatch(QuadrasActions.setQuadras(data.quadras));
            dispatch(MicroAreasActions.setMicroAreas(data.micro_areas));
            dispatch(LogradourosActions.setLogradouros(data.logradouros));
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

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
