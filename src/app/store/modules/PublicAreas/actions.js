import { bindActionCreators } from 'redux';
import { forEach, values } from 'lodash';

export const actions = {

}

export const getters = {
    getPublicAreas(){
        return (dispatch, getState) => {
            let state = getState().PublicAreas
            forEach(state, mapPublicAreas)
            return values(state)
        }
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);

function mapPublicAreas(value, key) {
    value.$id = key
}