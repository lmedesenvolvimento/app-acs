import { AsyncStorage } from 'react-native'

import _ from 'lodash'

class LocalStorage {
    constructor(store, defaultValues){
        this.store = store
        this.state = null
        this.defaultValues = defaultValues
        // register mixin for persist in AsyncStorage
        _.mixin({
            write: async () => await this.write(this.state)
        })
    }
    async read(){
        try {
            let response = await AsyncStorage.getItem(this.store)
            if(this.state){
                return this.state
            }
            if (response) {
                this.state = _.chain(this.deserialize(response))
                return this.state
            } else {
                await this.write(this.defaultValues)
                this.state = _.chain(this.defaultValues)
                return this.state
            }
        } catch (error) {
            return null
        }
    }
    async write(data){
        try {
            await AsyncStorage.setItem(this.store, this.serialize(data))
        } catch (error) {
            return null
        }
    }
    async clear(){
        try {
            await AsyncStorage.removeItem(this.store)
        } catch (error) {
            return null
        }
    }
    serialize(data){
        return JSON.stringify(data, null, 2)
    }
    deserialize(data){
        return JSON.parse(data)
    }
}

const localStorage = new LocalStorage('@localStorage', { user: null, users: {} })

export default localStorage;