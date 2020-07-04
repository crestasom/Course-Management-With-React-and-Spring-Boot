import { SET_AUTH, CLEAR_AUTH, SET_TAB } from '../actions/type'
const initialState = {
    isAuthenticated: false,
    role: "",
    tab: "Course"
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                role: action.payload.role
            }
        case CLEAR_AUTH:
            return {
                ...state,
                isAuthenticated: false,
                role: "",
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
