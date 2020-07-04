import thunk from 'redux-thunk'
//import rootReducer from './reducers'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
//import createEngine from 'redux-storage-engine-localstorage';
//import * as storage from 'redux-storage';
import authReducer from './reducers/authReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
}
//const rootReducer = storage.reducer(combineReducers({ auth: authReducer }))
const rootReducer = combineReducers({ auth: authReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)
const initialState = {}
const middleware = [thunk]



export const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export const persistor = persistStore(store)




// const engine = createEngine('course-application');
// const middleware1 = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(middleware1)(createStore);

// const store = createStoreWithMiddleware(
//     rootReducer,
//     initialState,
//     compose(
//         applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )
// const load = storage.createLoader(engine);
// load(store)
//     .then((newState) => console.log('Loaded state:', newState))
//     .catch(() => console.log('Failed to load previous state'));
// export default store