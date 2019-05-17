import { filter } from 'lodash'
import { bindActionCreators } from 'redux';

export const actions = {

}

export const getters = {
    getPublicAreas(fieldgroupId){
        return (dispatch, getState) => {
            let publicAreas = getState().PublicAreas.data
            return filter(publicAreas, { $field_group: fieldgroupId })
        }
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);