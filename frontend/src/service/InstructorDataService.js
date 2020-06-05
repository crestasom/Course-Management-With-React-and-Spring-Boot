import axios from "axios"
const INSTRUCTOR_API_URL='http://localhost:8080'
class InstructorDataService{

    saveInstructor(instructor){
        console.log("saving"+instructor.name)
        return axios.post(`${INSTRUCTOR_API_URL}/instructor/save`,instructor)
    }
}
export default new InstructorDataService()