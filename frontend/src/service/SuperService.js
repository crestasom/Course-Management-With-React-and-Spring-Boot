import { authHeader } from '../helpers'
class SuperService{
  
    requestWithHeader(method, url,data) {

        const requestOptions = {
            headers: authHeader()
        };
        if(data===null || data===undefined){
        return method(url, requestOptions)
        }else{
            return method(url,data ,requestOptions)
        }
    }
}

export default SuperService