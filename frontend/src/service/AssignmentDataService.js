import axios from 'axios'
import SuperService from './SuperService'
const BACKEND_API_URL = 'http://localhost:8085'

class AssignmentDataService extends SuperService {

    save(assignmentdata) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/assignments/add`, assignmentdata)
    }
    getAll() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/assignments`)
    }

    getFile(path) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/assignments/getfile/?path=${encodeURI(path)}`)
    }
    getJscript() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/assignments/getjs`)
    }

    deleteAssignment(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/assignments/${id}`)
    }

}
export default new AssignmentDataService()