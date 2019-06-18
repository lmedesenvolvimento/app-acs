import Types from './types';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case Types.SET_QUADRAS:
        return {
            ...state,
            data: action.data
        };
    default:
        return state;
    }
};
