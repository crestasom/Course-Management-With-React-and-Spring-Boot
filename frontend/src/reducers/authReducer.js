import { SET_AUTH, CLEAR_AUTH, SET_TAB } from '../actions/type'
const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    tab: "Course"
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                isAdmin: action.payload.isAdmin
            }
        case CLEAR_AUTH:
            return {
                ...state,
                isAuthenticated: false,
                isAdmin: false,
            }
        case SET_TAB:
            return {
                ...state,
                tab: action.payload

            }
        default:
            return state
    }
}
