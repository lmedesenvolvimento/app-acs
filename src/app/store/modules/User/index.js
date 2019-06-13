import types from './types';

const initialState = {
    data: null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.SET_USER:
        return {
            ...state,
            data: action.data
        };
    default:
        return state;
    }
};
