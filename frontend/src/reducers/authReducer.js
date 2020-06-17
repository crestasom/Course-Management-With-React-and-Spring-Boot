import { SET_AUTH, CLEAR_AUTH,SET_ERROR,CLEAR_ERROR } from '../actions/type'
const initialState = {
    isAuthenticated: false,
    message:""
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case CLEAR_AUTH:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state
    }
}
