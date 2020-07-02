import axios from "axios"
import SuperService from "./SuperService";
const BACKEND_API_URL = process.env.REACT_APP_URL
class InstructorDataService extends SuperService {

    saveInstructor(instructor) {

        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/instructors/save`, instructor)
    }
    getInstructors() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/instructors`)
    }
    deleteInstructor(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/instructors/${id}`)
    }
    getInstructor(username) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/instructors/${username}`)
    }
    getInstructorById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/instructors/id/${id}`)
    }
}
export default new InstructorDataService()