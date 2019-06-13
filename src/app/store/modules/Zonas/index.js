import Types from './types';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case Types.FETCH_ZONAS:
        return {
            ...state,
            data: action.data
        };
    default:
        return state;
    }
};
