import {  CLEAR_ALERT } from "./type"

export const setMsg = (msg,msgType) => {
    const alert={
        msg,msgType
    }
localStorage.setItem("alert",JSON.stringify(alert))
console.log(localStorage.getItem("alert"))
}


export const clearMsg = () => dispatch => {
    dispatch(
        {
            type: CLEAR_ALERT,
            
        })
}

export const getMsg = () =>{
    if(localStorage.getItem("alert")){
        const alert=localStorage.getItem("alert")
        localStorage.removeItem("alert")
        return alert
    }
    return null
}

