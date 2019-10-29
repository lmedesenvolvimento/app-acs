import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import Constants from 'expo-constants';


import thunk from 'redux-thunk';
import rootReducer from './modules';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['Auth', 'Loading', 'UI']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = null;

    // eslint-disable-next-line no-undef
    if (__DEV__) {
        const { manifest } = Constants;
        const enhance = composeWithDevTools({
            realtime: true,
            hostname: manifest.debuggerHost.split(':')[0],
            port: '8000'
        });

        store = createStore(persistedReducer, enhance(
            applyMiddleware(thunk)
        ));
    } else {
        store = createStore(persistedReducer, applyMiddleware(thunk));
    }

    const persistor = persistStore(store);

    return {
        store,
        persistor
    };
};
