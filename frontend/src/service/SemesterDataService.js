import axios from "axios"
import SuperService from "./SuperService";
const BACKEND_API_URL = 'http://localhost:8085'
class SemesterDataService extends SuperService {

    saveSemester(semester) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/semester/`, semester)
    }
    getSemesterData() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/semester`)
    }
    deleteSemester(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/semester/${id}`)
    }

    getSemesterById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/semester/${id}`)
    }
    mapSubject(sem) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/semester/map`, sem)
    }
}
export default new SemesterDataService()