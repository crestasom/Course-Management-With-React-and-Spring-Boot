import { authHeader } from '../helpers'


class SuperService {

    requestWithHeader(method, url, data) {

        const requestOptions = {
            headers: authHeader()
        };
        if (data === null || data === undefined) {
            return method(url, requestOptions).catch(error => {
                if (error.response) {
                    // Request made and server responded
                    if (error.response.status === 403) {
                        this.logout()
                    } else {
                        //  window.location.replace("/")
                    }

                    // console.log("data", error.response.data);
                    // console.log("status", error.response.status);
                    // console.log("headers", error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    //window.location.replace("/")
                }
            });
        } else {
            return method(url, data, requestOptions).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });
        }
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        window.location.replace("/login")
    }
}


export default SuperService