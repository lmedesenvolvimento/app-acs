import Types from './types';

const initialState = {
    data: [],
};

export default (state = initialState, action) => {
    const { data } = state;

    switch (action.type) {
    case Types.SET_INDIVIDUOS:
        return {
            ...state,
            data: action.data
        };

    case Types.ADD_INDIVIDUOS:
        state.data.push(action.data);
        return Object.assign({}, state);

    case Types.UPDATE_INDIVIDUOS:
        data[action.index] = action.data;
        return Object.assign({}, state, { data });

    case Types.DESTROY_INDIVIDUOS:
        state.data.splice(action.index, 1);
        return Object.assign({}, state);

    default:
        return state;
    }
};
