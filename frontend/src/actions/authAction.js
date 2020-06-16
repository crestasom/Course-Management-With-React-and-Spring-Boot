import { IS_AUTH, SET_AUTH, CLEAR_AUTH } from './type'
import UserService from '../service/UserService'
export const setAuth = () => dispatch => {
    const status = UserService.isLoggedin()
    dispatch(
        {
            type: SET_AUTH,
            payload: status
        })
}

export const clearAuth = () => dispatch => {
    dispatch(
        {
            type: CLEAR_AUTH,
        })
}