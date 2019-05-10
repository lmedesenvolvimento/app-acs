import initialState from './state';
import types from './types';

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
};