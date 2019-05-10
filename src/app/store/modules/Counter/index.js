import { bindActionCreators } from 'redux'
import states from './state';
import types from './types';
import actions from './actions';

export const CounterActions = dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);

function reducer(state = states, action){
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

export default reducer;