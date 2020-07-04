import React, { Component } from 'react'
import CourseDataService from '../../service/CourseDataService'
import InstructorDataService from '../../service/InstructorDataService'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMsg } from '../../actions/alertAction';
import { setTab } from '../../actions/authAction'
import Alert from '../common/Alert'

class ListCoursesComponents extends Component {

    constructor(props) {
        super(props)
        this.refreshCourses = this.refreshCourses.bind(this)
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.refreshCoursesByLecturer = this.refreshCoursesByLecturer.bind(this)
        this.props.setTab("Course")
        this.state = {
            courses: [],
            message: "",
            messageType: "",
            instructors: [],
            isAuthenticated: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { isAuthenticated } = props

        return {
            isAuthenticated,

        }
    }
    componentDidMount() {
        this.refreshCourses()
        this.getInstructors()
        const alert = getMsg()
        if (alert) {
            let { msg, msgType } = alert
            this.setState({
                message: msg, messageType: msgType
            })
        }
    }

    getInstructors() {
        InstructorDataService.getInstructors().then(
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
                    courses: response.data,
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
                    () => {
                        this.setState({ message: `Delete of course ${id} Successful`, messageType: "success" })
                        this.refreshCourses()
                    }
                )
        }
    }

    render() {
        const { isAuthenticated, message, messageType } = this.state
        return (
            <div className="container">
                <h3>All Courses</h3>
                {message && <Alert message={message} messageType={messageType} />}
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
                                    <th>Actions</th>
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
                                        {course.lecturer ? <td> {course.lecturer.name} </td> : <td style={{ color: "red" }}><b>Not Set</b></td>}
                                        {isAuthenticated ? (
                                            <>
                                                <td><button className="btn btn-primary" data-toggle="tooltip" title="View Course Details" onClick={() => this.props.history.push(`/course/view/${course.id}`)} style={{ marginRight: 4 }}><i className="fas fa-info-circle" /></button>
                                                    <button className="btn btn-success" data-toggle="tooltip" title="Update Course" onClick={() => this.props.history.push(`/course/add/${course.id}`)} style={{ marginRight: 4 }}><i className="far fa-edit" /></button>
                                                    <button className="btn btn-warning" data-toggle="tooltip" title="Delete Course" onClick={() => this.deleteCourseClicked(course.id)} style={{ marginRight: 4 }}><i className="fas fa-trash-alt" /></button></td>
                                            </>
                                        ) : null}

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
ListCoursesComponents.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setTab: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,

})
export default connect(mapStateToProps, { setTab })(ListCoursesComponents)
