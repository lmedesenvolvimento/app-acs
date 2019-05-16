import shortid from 'shortid'
import { bindActionCreators } from 'redux';
import { forEach, values } from 'lodash';

import localStorage from '@/services/LocalStorage';

import Types from './types';

export const actions = {
    fetchMappings(data){
        return {
            type: Types.FETCH_MAPPINGS,
            data
        }
    },
    fetchAsyncMappings(){
        return async (dispatch, getState) => {
            let payload = {}
            let db = await localStorage.read();
            let user = getState().User.data;
            let action = this.fetchMappings(payload);

            if (!user) return
            
            let { mappings } = db.get(`users.${user.key}`).omit(['public_areas']).value();
            
            mappings.forEach(m => {
                let key = shortid.generate()
                payload[key] = m
            });

            dispatch(action);
        }
    }
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