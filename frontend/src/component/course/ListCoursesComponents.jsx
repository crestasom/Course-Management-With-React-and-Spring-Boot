import React, { Component } from 'react'
import CourseDataService from '../../service/CourseDataService'
import InstructorDataService from '../../service/InstructorDataService'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setTab } from '../../actions/authAction'

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
            instructors: [],
            data: [],
            isAuthenticated: false,
            total: 0,
            pageNumber: 1,
            pageSize: 2,
            loading: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { isAuthenticated } = props

        return {
            isAuthenticated,

        }
    }
    componentDidMount() {
        this.refreshCourses();
        this.getInstructors();
        this.loadPage(this.state.pageNumber, this.state.pageSize)
        //this.loadPage(this.state.pageNumber, this.state.pageSize)
    }
    handlePageChange(event) {
        this.getData(event.pageNumber, event.pageSize)
    }


    async loadPage(pageNumber, pageSize) {
        this.setState({ loading: true })

        setTimeout(() => {
            let result = this.getData(pageNumber, pageSize);
            this.setState(Object.assign({}, result, {
                data: result.rows,
                loading: false
            }))
        }, 1000);
    }

    getData(pageNumber, pageSize) {
        const { courses } = this.state
        let data = [];
        let start = (pageNumber - 1) * pageSize;
        let end = start + pageSize
        for (let i = start; i < end; i++) {
            let course = courses[i]
            if (course) {
                data.push({
                    id: course.id,
                    description: course.description,
                    instructor: course.instructor.name
                });
            }
        }
        return {
            total: courses.length,
            pageNumber: pageNumber,
            pageSize: pageSize,
            rows: data
        };

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
    refreshCourses(pageNo, pageSize) {
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
                    response => {
                        this.setState({ message: `Delete of course ${id} Successful` })
                        this.refreshCourses()
                    }
                )
        }
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
                                    <th>Veiw Details</th>
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
                                                <td><button className="btn btn-success" onClick={() => this.props.history.push(`/course/view/${course.id}`)}>View</button></td>
                                                <td><button className="btn btn-success" onClick={() => this.props.history.push(`/course/add/${course.id}`)}>Update</button></td>
                                                <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
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
