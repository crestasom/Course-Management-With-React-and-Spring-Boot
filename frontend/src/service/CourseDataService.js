import axios from 'axios'
import SuperService from './SuperService'
const BACKEND_API_URL = 'http://localhost:8085'

class CourseDataService extends SuperService {

    retrieveAllCourses(userName) {
        if (userName === '' || userName === undefined) {
            return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/courses`)
        }
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/courses/list/${userName}`)

    }
    deleteCourse(id) {

        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/courses/${id}`)
    }
    getCourse(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/courses/${id}`)
    }

    createCourse(userName, course) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/courses/save/${userName}`, course)
    }
    updateCourse(userName, id, course) {
        return this.requestWithHeader(axios.put, `${BACKEND_API_URL}/courses/update/${userName}`, course)
    }
}
export default new CourseDataService()