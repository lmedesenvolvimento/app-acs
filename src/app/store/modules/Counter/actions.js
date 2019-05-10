import { bindActionCreators } from 'redux'

import Types from './types'

export const actions = {
    increment(){
        return {
            type: Types.INCREMENT
        }
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);