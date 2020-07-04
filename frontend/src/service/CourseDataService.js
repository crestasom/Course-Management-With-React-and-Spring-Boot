import axios from 'axios'
import SuperService from './SuperService'
const BACKEND_API_URL = process.env.REACT_APP_URL

class CourseDataService extends SuperService {

    retrieveAllCourses(userName) {
        if (userName === '' || userName === undefined) {
            return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/get-all-courses`)
        }
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/courses/list/${userName}`)

    }
    retrieveAllCoursesWithSemMapping(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/courses/sem/${id}`)
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
    searchCourse(value) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/courses/search/${value}`)
    }
}
export default new CourseDataService()