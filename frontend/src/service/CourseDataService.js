import axios from 'axios'
import { authHeader } from '../helpers'
import SuperService from './SuperService'
const INSTRUCTOR = 'som'
const COURSE_API_URL = 'http://localhost:8085'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors`

class CourseDataService extends SuperService {
   
    retrieveAllCourses(userName) {
        if (userName === '' || userName === undefined) {
            return this.requestWithHeader(axios.get, `${COURSE_API_URL}/courses`)
        }
        return this.requestWithHeader(axios.get, `${COURSE_API_URL}/instructors/${userName}/courses`)

    }
    deleteCourse(id) {

        return this.requestWithHeader(axios.delete, `${COURSE_API_URL}/courses/${id}`)
    }
    getCourse(id) {
        return this.requestWithHeader(axios.get, `${COURSE_API_URL}/courses/${id}`)
    }

    createCourse(userName, course) {
        return this.requestWithHeader(axios.post, `${INSTRUCTOR_API_URL}/${userName}/courses`, course)
    }
    updateCourse(userName, id, course) {
        return this.requestWithHeader(axios.put, `${INSTRUCTOR_API_URL}/${userName}/courses/${id}`, course)
    }
    getInstructors() {
        return this.requestWithHeader(axios.get, `${COURSE_API_URL}/instructors`)
    }
}
export default new CourseDataService()