import { bindActionCreators } from 'redux';
import Http, { defineAccessToken } from '@/services/Http';
import { actions as UserActions } from '@redux/modules/User/actions';

import Types from './types';

const signed = {
    type: Types.SIGNED
};

const signInStart = {
    type: Types.SIGNIN_START
};

const signInDone = {
    type: Types.SIGNIN_DONE
};

const signInFail = {
    type: Types.SIGNIN_FAIL
};

function signInAsync(email, password, onSuccess, onFail) {
    return async (dispatch) => {
        dispatch(signInStart);

        Http.post('/oauth/token', {
            email,
            password,
            grant_type: 'password'
        })
            .then(({ data }) => {
                const payload = Object.assign({}, data, { email });
                dispatch(signed);
                dispatch(signInDone);
                // create user storages
                dispatch(UserActions.setUser(payload));
                // set in all request axios bearer token
                defineAccessToken(data);
                // callback
                onSuccess(data);
            }).catch((error) => {
                dispatch(signInFail);
                dispatch(signInDone);
                onFail(error);
            });
    };
}

function signOutAsync() {
    return async (dispatch) => {
        dispatch(UserActions.setUser(null));
        dispatch({ type: Types.SIGNOUT });
    };
}

export const actions = {
    signed,
    signInStart,
    signInDone,
    signInFail,
    signInAsync,
    signOutAsync
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
