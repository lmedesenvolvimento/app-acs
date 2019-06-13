import { bindActionCreators } from 'redux';
import Http from '@/services/Http';
import { actions as UserActions } from '@redux/modules/User/actions';

import Types from './types';

function signed() {
    return {
        type: Types.SIGNED
    };
}
function signInStart() {
    return {
        type: Types.SIGNIN_START
    };
}
function signInDone() {
    return {
        type: Types.SIGNIN_DONE
    };
}

function signInFail() {
    return {
        type: Types.SIGNIN_FAIL
    };
}

function signInAsync(email, password, onSuccess, onFail) {
    return async (dispatch) => {
        dispatch(signInStart());

        Http.post('/api/users/sign_in', {
            user: {
                email,
                password
            }
        })
            .then(({ data }) => {
                dispatch(signed());
                dispatch(signInDone());

                // create user storages
                dispatch(UserActions.setUser(data.user));
                
                onSuccess(data);
            }).catch((error) => {
                dispatch(signInFail());
                dispatch(signInDone());
                onFail(error);
            });
    };
}

function signOutAsync() {
    return () => {
        return false;
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
