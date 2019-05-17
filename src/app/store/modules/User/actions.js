import { bindActionCreators } from 'redux';
import { generate as shortid } from 'shortid'

import Types from './types';

import localStorage from '@/services/LocalStorage';

import { MappingStatus } from "@/types/mapping"

export const actions = {
    setUser(data){
        return {
            type: Types.SET_USER,
            data: data
        }
    },
    setUserAsync(data){
        return async dispatch => {
            // load asyc storage
            let db = await localStorage.read();

            if (data) {
                data.key = data.email.replace(/\./g, '_');
            }

            // commit user changes            
            await db.set('user', data).write().value();

            let user = db.get('user').value();

            dispatch(this.setUser(user));

            return user
        }
    },
    createUserAsyncStore(email){
        return async _ => {
            // load asyc storage
            let key = email.replace(/\./g, '_');
            let db = await localStorage.read();            
            let storage = db.get(`users.${key}`).value();

            if(!storage){
                await db.set(`users.${key}`, {
                    mappings: [
                        {
                            key: shortid(),
                            id: 1,
                            cycle_id: 1,
                            status: MappingStatus.not_finished,
                            field_group: {
                                id: 1,
                                name: 'Quadra 1',
                                neighborhood: {
                                    name: 'Messejana'
                                }
                            }
                        },
                        {
                            key: shortid(),
                            id: 2,
                            cycle_id: 1,
                            status: MappingStatus.not_finished,
                            field_group: {
                                id: 2,
                                name: 'Quadra 2',
                                neighborhood: {
                                    name: 'Messejana'
                                }
                            }
                        }
                    ]
                }).write().value();
            }
            return true
        }
    },
    clearAll(){
        return async _=> {
            let db = await localStorage.read();
            await db.set('users', {}).write().value();
        }
    }
}

export default dispatch => (
    bindActionCreators(Object.assign({}, actions), dispatch)
);