import { bindActionCreators } from 'redux';
import Http from '@/services/Http';

import Types from './types'

export const actions = {
    signed(){
        return {
            type: Types.SIGNED
        }
    },
    signInStart(){
        return {
            type: Types.SIGNIN_START
        }
    },
    signInDone(){
        return {
            type: Types.SIGNIN_DONE
        }
    },
    signInFail(){
        return {
            type: Types.SIGNIN_FAIL
        }
    },
    signInAsync(email, password, onSuccess, onFail) {
        return (dispatch) => {
            dispatch(this.signInStart());

            Http.post("/api/users/sign_in", {
                user: {
                    email: email,
                    password: password
                }
            }).then(() => {
                dispatch(this.signed());
                dispatch(this.signInDone());
                onSuccess();
            }).catch(() => {
                dispatch(this.signInFail());
                dispatch(this.signInDone());
                onFail();
            })
        }
    },
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);