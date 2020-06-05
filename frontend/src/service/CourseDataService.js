import axios from 'axios'
const INSTRUCTOR = 'som'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors`

class CourseDataService {

    retrieveAllCourses(userName) {
        console.log(`${INSTRUCTOR_API_URL}/courses`)
        if (userName === '' || userName === undefined) {
            return axios.get(`${COURSE_API_URL}/courses`)
        }
        return axios.get(`${COURSE_API_URL}/instructors/${userName}/courses`)

    }
    deleteCourse(id) {
        return axios.delete(`${COURSE_API_URL}/courses/${id}`)
    }
    getCourse(id) {
        return axios.get(`${COURSE_API_URL}/courses/${id}`)
    }

    createCourse(userName, course) {
        console.log(`${INSTRUCTOR_API_URL}/${userName}/courses`)
        return axios.post(`${INSTRUCTOR_API_URL}/${userName}/courses`, course)
    }
    updateCourse(userName, id, course) {
        return axios.put(`${INSTRUCTOR_API_URL}/${userName}/courses/${id}`, course)
    }
    getInstructors() {
        return axios.get(`${COURSE_API_URL}/instructors`)
    }
}
export default new CourseDataService()