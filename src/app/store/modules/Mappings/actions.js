import { bindActionCreators } from 'redux';
import { forEach, values } from 'lodash';

export const actions = {

};

export const getters = {
    getMappings(){
        return (dispatch, getState) => {
            let state = getState().Mappings
            forEach(state, mapMappings)
            return values(state)
        };
    }
};

function mapMappings(value, key){
    value.$id = key
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);