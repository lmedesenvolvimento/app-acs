import { bindActionCreators } from 'redux';

import Http from '@/services/Http';

import Types from './types';

function asyncFetchCurrentUser(token) {
    return async (dispatch) => {
        try {
            const { data } = await Http.get('api/v1/users');
            const action = setUser({
                ...token,
                ...data
            });

            dispatch(action);
        } catch (error) {
            const action = setUser(token);
            dispatch(action);
            // console.warn(error);
        }
    };
}

function setUser(data) {
    return {
        type: Types.SET_USER,
        data
    };
}
export const actions = {
    setUser,
    asyncFetchCurrentUser
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);
