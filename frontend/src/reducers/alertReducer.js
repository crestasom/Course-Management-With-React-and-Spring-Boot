import { SET_ALERT,CLEAR_ALERT } from '../actions/type'
const initialState = {
    message:"",
    messageType:"",
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                message:action.payload.msg,
                messageType:action.payload.msgType,
            }
        case CLEAR_ALERT:
            return {
                ...state,
                message:"",
                messageType:"",
            }
        default:
            return state
    }
}
