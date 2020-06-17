import React, { Component } from 'react'
import CourseDataService from '../../service/CourseDataService'
import { connect } from 'react-redux'

class ListCoursesComponents extends Component {

    constructor(props) {
        super(props)
        this.refreshCourses = this.refreshCourses.bind(this)
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.addInstructorClicked = this.addInstructorClicked.bind(this)
        this.refreshCoursesByLecturer = this.refreshCoursesByLecturer.bind(this)

        this.state = {
            courses: [],
            message: null,
            instructors: [],
            isAuthenticated: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { isAuthenticated } = props

        return {
            isAuthenticated: isAuthenticated
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
        if (window.confirm("Are you sure you want to delete this course?")) {
            CourseDataService.deleteCourse(id)
                .then(
                    response => {
                        this.setState({ message: `Delete of course ${id} Successful` })
                        this.refreshCourses()
                    }
                )
        }
    }
    updateCourseClicked(id) {
        this.props.history.push(`/courses/${id}`)
    }

    addCourseClicked() {
        this.props.history.push("/courses/-1")
    }
    addInstructorClicked() {
        this.props.history.push("/instructor/add")
    }
    render() {
        const { isAuthenticated } = this.state
        return (
            <div className="container">
                <h3>All Courses</h3>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
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
                                {isAuthenticated ? (<>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </>
                                ) : null}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(course =>
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.description}</td>
                                        <td>{course.instructor.name}</td>
                                        {isAuthenticated ? (
                                            <>
                                                <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                                <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
                                            </>
                                        ) : null}

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {isAuthenticated ? (
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add Course</button> <br />
                        <button className="btn btn-success" onClick={this.addInstructorClicked}>Add Instructor</button>
                    </div>
                ) : null}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(ListCoursesComponents)
