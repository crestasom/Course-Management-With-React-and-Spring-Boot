import { SET_AUTH, CLEAR_AUTH, SET_TAB } from './type'
export const setAuth = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("user"))
    let data = {}
    if (user) {
        data = {
            isAdmin: user.admin,
            isAuthenticated: true
        }
    } else {
        data = {
            isAdmin: false,
            isAuthenticated: false
        }
    }
    console.log(data)

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

