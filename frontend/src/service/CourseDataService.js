import axios from 'axios'
import { authHeader } from '../helpers'
const INSTRUCTOR = 'som'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors`

class CourseDataService {

    retrieveAllCourses(userName) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        if (userName === '' || userName === undefined) {
            return axios.get(`${COURSE_API_URL}/courses`, requestOptions)
        }

        return axios.get(`${COURSE_API_URL}/instructors/${userName}/courses`, requestOptions)

    }
    deleteCourse(id) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return axios.delete(`${COURSE_API_URL}/courses/${id}`, requestOptions)
    }
    getCourse(id) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return axios.get(`${COURSE_API_URL}/courses/${id}`, requestOptions)
    }

    createCourse(userName, course) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return axios.post(`${INSTRUCTOR_API_URL}/${userName}/courses`, course, requestOptions)
    }
    updateCourse(userName, id, course) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return axios.put(`${INSTRUCTOR_API_URL}/${userName}/courses/${id}`, course, requestOptions)
    }
    getInstructors() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return axios.get(`${COURSE_API_URL}/instructors`, requestOptions)
    }
}
export default new CourseDataService()