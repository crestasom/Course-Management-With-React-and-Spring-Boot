import axios from "axios"
import { authHeader } from '../helpers'
const INSTRUCTOR_API_URL = 'http://localhost:8080'
class InstructorDataService {

    saveInstructor(instructor) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return axios.post(`${INSTRUCTOR_API_URL}/instructor/save`, instructor, requestOptions)
    }
}
export default new InstructorDataService()