import initialState from './state';
import types from './types';

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,
                counter: ( state.counter + 1 )
            };
        default:
            return state;
    }
}
