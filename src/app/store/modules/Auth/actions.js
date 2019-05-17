import { bindActionCreators } from 'redux';
import Http from '@/services/Http';

import Types from './types'
import { actions as UserActions } from '@redux/modules/User/actions';

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
        return async (dispatch) => {
            dispatch(this.signInStart());

            Http.post("/api/users/sign_in", {
                user: {
                    email: email,
                    password: password
                }
            })
            .then(({data}) => {
                dispatch(this.signed());
                dispatch(this.signInDone());   
                
                // create user storages
                dispatch(UserActions.setUserAsync(data.user)).then(_ => {
                    dispatch(UserActions.createUserAsyncStore(data.user.email)).then( _ => {
                        onSuccess()
                    });
                });

            }).catch((error) => {
                dispatch(this.signInFail());
                dispatch(this.signInDone());
                onFail();
            })
        }
    },
    signOutAsync(){
        return dispatch => {
            dispatch(
                UserActions.setUserAsync(null)
            );
            dispatch(
                UserActions.clearAll()
            );
        }
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);