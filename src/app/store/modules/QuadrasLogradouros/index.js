import Types from './types';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case Types.SET_QUADRAS_LOGRADOUROS:
        return {
            ...state,
            data: action.data
        };
    case Types.ADD_QUADRAS_LOGRADOUROS:
        state.data.push(action.data);
        return Object.assign({}, state);
    default:
        return state;
    }
};
