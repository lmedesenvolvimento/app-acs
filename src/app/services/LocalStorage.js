import { AsyncStorage } from 'react-native';

import _ from 'lodash';

class LocalStorage {
    constructor(store, defaultValues) {
        this.store = store;
        this.state = null;
        this.defaultValues = defaultValues;
        // register mixin for persist in AsyncStorage
        _.mixin({
            write: async () => this.write(this.state)
        });
    }

    async read() {
        try {
            const response = await AsyncStorage.getItem(this.store);
            if (this.state) {
                return this.state;
            }
            if (response) {
                this.state = _.chain(this.deserialize(response));
            } else {
                await this.write(this.defaultValues);
                this.state = _.chain(this.defaultValues);
            }
            return this.state;
        } catch (error) {
            return null;
        }
    }

    async write(data) {
        try {
            return await AsyncStorage.setItem(this.store, this.serialize(data));
        } catch (error) {
            return null;
        }
    }

    async clear() {
        try {
            return await AsyncStorage.removeItem(this.store);
        } catch (error) {
            return null;
        }
    }

    serialize(data) {
        return JSON.stringify(data, null, 2);
    }

    deserialize(data) {
        return JSON.parse(data);
    }
}

const localStorage = new LocalStorage('@localStorage', {});

export default localStorage;
