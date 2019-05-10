import { bindActionCreators } from 'redux';

import Types from './types';

import localStorage from '@/services/LocalStorage';

export const actions = {
    setUser(data){
        return {
            type: Types.SET_USER,
            data: data
        }
    },
    setUserAsync(data){
        return async dispatch => {
            console.log("IN USER ACTION", data);
            // load asyc storage
            let db = await localStorage.read();
            
            // commit user changes            
            await db.set('user', data).write().value();

            let user = db.get('user').value();

            console.log(user);
            
            dispatch(this.setUser(user));

        }        
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);