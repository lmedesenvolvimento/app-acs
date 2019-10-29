import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';


import thunk from 'redux-thunk';
import rootReducer from './modules';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['Auth', 'Loading', 'UI']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const enhance = composeWithDevTools({
        realtime: true,
        hostname: '10.101.59.153',
        port: '8000'
    });

    const store = createStore(persistedReducer, enhance(
        applyMiddleware(thunk)
    ));

    // const store = createStore(persistedReducer, applyMiddleware(thunk));

    const persistor = persistStore(store);

    return {
        store,
        persistor
    };
};
