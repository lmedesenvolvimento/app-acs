import { bindActionCreators } from 'redux';
import Http from '@/services/Http';
import { actions as LoadingActions } from '@redux/modules/Loading/actions';
import { actions as AuthActions } from '@redux/modules/Auth/actions';

import Types from './types';

const fetchData = {
    type: Types.FETCH_DATA,
};

function AsyncFetchData(onSuccess, onFail) {
    return (dispatch) => {
        dispatch(LoadingActions.showLoading());
        Http.get('/api/v1/mapeamentos/query').then(({ data }) => {
            // dispatch(fetchData);
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
    AsyncFetchData
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
