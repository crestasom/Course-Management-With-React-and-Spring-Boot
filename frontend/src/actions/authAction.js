import { SET_AUTH, CLEAR_AUTH, SET_TAB } from './type'
export const setAuth = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("user"))
    let data = {}
    if (user) {
        data = {
            role: user.role,
            isAuthenticated: true
        }
    } else {
        data = {
            role: "",
            isAuthenticated: false
        }
    }
    dispatch(
        {
            type: SET_AUTH,
            payload: data
        })


}

export const clearAuth = () => dispatch => {
    dispatch(
        {
            type: CLEAR_AUTH,
        })
}

export const setTab = (tab) => dispatch => {
    dispatch({
        type: SET_TAB,
        payload: tab
    })
}

