import { bindActionCreators } from 'redux';

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
            let db = await localStorage.read();
            let user = getState().User.data;
            
            if (!user) return
            
            let { mappings } = db.get(`users.${user.key}`).omit(['public_areas']).value();        

            let action = this.fetchMappings(mappings);

            dispatch(action);
        }
    }
};

export const getters = {
    getMappings(){
        return (dispatch, getState) => {            
            return getState().Mappings.data
        };
    }
};

export default dispatch => (
    bindActionCreators(Object.assign({}, actions, getters), dispatch)
);