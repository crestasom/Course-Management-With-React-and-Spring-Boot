import axios from "axios"
import { authHeader } from '../helpers'
import SuperService from "./SuperService";
const INSTRUCTOR_API_URL = 'http://localhost:8085'
class InstructorDataService extends SuperService{

    saveInstructor(instructor) {

        return this.requestWithHeader(axios.post,`${INSTRUCTOR_API_URL}/instructor/save`, instructor)
    }
}
export default new InstructorDataService()