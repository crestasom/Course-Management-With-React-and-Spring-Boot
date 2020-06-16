import thunk from 'redux-thunk'
//import rootReducer from './reducers'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage';
import authReducer from './reducers/authReducer'

const initialState = {}
const middleware = [thunk]
const rootReducer = storage.reducer(combineReducers({ auth: authReducer }))
const engine = createEngine('course-application');
const middleware1 = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware1)(createStore);

const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));
export default store