import React, { Component } from 'react'
import CourseDataService from '../service/CourseDataService'
class ListCoursesComponents extends Component {

    constructor(props) {
        super(props)
        this.refreshCourses = this.refreshCourses.bind(this)
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.refreshCoursesByLecturer = this.refreshCoursesByLecturer.bind(this)

        this.state = {
            courses: [],
            message: null,
            instructors: []
        }
    }

    componentDidMount() {
        this.refreshCourses();
        this.getInstructors();
    }

    getInstructors() {
        CourseDataService.getInstructors().then(
            response => {
                this.setState({
                    instructors: response.data
                })
            }
        )
    }
    refreshCourses() {
        CourseDataService.retrieveAllCourses().then(
            response => {
                this.setState({
                    courses: response.data
                });
            }
        );
    }
    refreshCoursesByLecturer(event) {
        CourseDataService.retrieveAllCourses(event.target.value).then(
            response => {
                this.setState({
                    courses: response.data
                });
            }
        )
    }


    deleteCourseClicked(id) {
        CourseDataService.deleteCourse(id)
            .then(
                response => {
                    this.setState({ message: `Delete of course ${id} Successful` })
                    this.refreshCourses()
                }
            )

    }
    updateCourseClicked(id) {
        this.props.history.push(`/courses/${id}`)
    }

    addCourseClicked() {
        this.props.history.push("/courses/-1")
    }
    render() {

        return (
            <div className="container">
                <h3>All Courses</h3>
                {this.state.message && <div class='alert alert-success'>{this.state.message}</div>}
                <div className="container">
                    <div className="container">
                        <label>Filter By: Instructor</label>
                        <select name="instructor" className="form-control" onChange={this.refreshCoursesByLecturer}>
                            <option value="">---</option>
                            {this.state.instructors.map(i =>
                                <option key={i.id} value={i.userName}>{i.name}</option>)}
                        </select>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Instructor</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(course =>
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.description}</td>
                                        <td>{course.instructor.name}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponents
