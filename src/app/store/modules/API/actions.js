import { bindActionCreators } from 'redux';
import { actions as AuthActions } from '@redux/modules/Auth/actions';
import { actions as LoadingActions } from '@redux/modules/Loading/actions';
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
}

function asynClearData(){
    return (dispatch) => { 
        const emptyArray = [];
        dispatch(clearData);
        dispatch(QuadrasActions.setQuadras(emptyArray));
        dispatch(MicroAreasActions.setMicroAreas(emptyArray));
        dispatch(LogradourosActions.setLogradouros(emptyArray));
    }    
}

function asyncFetchData(onSuccess, onFail) {
    return (dispatch) => {
        dispatch(LoadingActions.showLoading());
        Http.get('/api/v1/mapeamentos/query').then(({ data }) => {
            dispatch(fetchData);
            dispatch(QuadrasActions.setQuadras(data.quadras));
            dispatch(MicroAreasActions.setMicroAreas(data.micro_areas));
            dispatch(LogradourosActions.setLogradouros(data.logradouros));
            dispatch(LoadingActions.hideLoading());
            onSuccess(data);
        }).catch((err) => {
            dispatch(AuthActions.signOutAsync());
            dispatch(LoadingActions.hideLoading());
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
