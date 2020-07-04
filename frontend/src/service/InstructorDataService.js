import axios from "axios"
import SuperService from "./SuperService";
const BACKEND_API_URL = process.env.REACT_APP_URL
class InstructorDataService extends SuperService {

    saveInstructor(instructor) {

        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/lecturer/save`, instructor)
    }
    getInstructors() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/get-all-lecturers`)
    }
    deleteInstructor(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/lecturer/${id}`)
    }
    getInstructor(username) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/lecturer/${username}`)
    }
    getInstructorById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/lecturer/id/${id}`)
    }
}
export default new InstructorDataService()