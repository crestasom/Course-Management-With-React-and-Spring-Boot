import axios from 'axios'
import SuperService from './SuperService'
const BACKEND_API_URL = process.env.REACT_APP_URL
class UserDataService extends SuperService {
    checkLogin(username, password) {
        const user = { username, password }
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/auth`, user)
    }

    getUsers() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/users`)
    }

    save(user) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/users`, user)
    }

    getUserById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/users/${id}`)
    }
    getUserByUserName(username) {
        console.log(username)
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/users/get/${username}`)
    }

    checkPassword(username, password) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/auth/check-password`, { username, password })
    }
    deleteUser(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/users/${id}`)
    }


    handleResponse(response) {
        console.log(response.text())
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                    //location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        }).catch(error => {
            console.log(error)

        });
    }
    isLoggedin() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.jwt) {
            return true
        } else {
            return false
        }
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
}
export default new UserDataService()