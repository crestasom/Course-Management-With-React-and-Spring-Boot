import { SET_ALERT, CLEAR_ALERT } from "./type"

export const setMsg = (msg,msgType) => dispatch => {
    dispatch(
        {
            type: SET_ALERT,
            payload:{msg,msgType}
        })
}

export const clearMsg = () => dispatch => {
    console("clearing error")
    dispatch(
        {
            type: CLEAR_ALERT,
            
        })
}