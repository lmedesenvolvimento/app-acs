import { bindActionCreators } from 'redux'
import Types from './types'

export const actions = {
    showLoading(){
        return {
            type: Types.SHOW_LOADING
        }
    },
    hideLoading(){
        return {
            type: Types.HIDE_LOADING
        }
    },
    toggleLoading(){
        return {
            type: Types.TOGGLE_LOADING
        }
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);