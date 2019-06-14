import initialState from './state';
import types from './types';

export default (state = initialState, action) => {
    switch (action.type) {
    case types.SIGNIN_START:
        return {
            ...state,
            authenticating: true
        };
    case types.SIGNIN_DONE:
        return {
            ...state,
            authenticating: false
        };
    case types.SIGNIN_FAIL:
        return {
            ...state,
            error: true,
            errorMessage: 'Não foi possível efetuar o login, email ou senha inválidos',
            authenticated: false,
            authenticating: false
        };
    case types.SIGNED:
        return {
            ...state,
            authenticated: true,
        };
    case types.SIGNOUT:
        return {
            ...state,
            authenticated: false
        };
    default:
        return state;
    }
};
