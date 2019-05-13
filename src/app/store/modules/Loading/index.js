import Types from './types'

const initialState = {
    visible: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.SHOW_LOADING:
            return {
                ...state,
                visible: true
            }
        case Types.HIDE_LOADING:
            return {
                ...state,
                visible: false
            }
        case Types.TOGGLE_LOADING:
            return {
                ...state,
                visible: !state.visible
            }
        default:
            return state;
    }
};