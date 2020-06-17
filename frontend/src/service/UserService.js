import axios from 'axios'
const COURSE_API_URL = 'http://localhost:8085'
class UserService {
    checkLogin(username, password) {
        const user = { username, password }
        return axios.post(`${COURSE_API_URL}/auth`, user)
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
export default new UserService()