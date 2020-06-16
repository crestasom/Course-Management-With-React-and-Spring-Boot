import { combineReducers } from 'redux'
import authReducer from './authReducer'
import * as storage from 'redux-storage';

export default storage.reducer(combineReducers(
    {
        auth: authReducer
    }
))