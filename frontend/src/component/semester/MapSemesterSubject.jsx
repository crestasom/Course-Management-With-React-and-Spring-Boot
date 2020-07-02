import React, { Component } from 'react'
import CourseDataService from '../../service/CourseDataService'
import Alert from '../common/Alert'
import loading from '../../img/loading.gif'
import SemesterDataService from '../../service/SemesterDataService'
import { setMsg } from '../../actions/alertAction'
class MapSemesterSubject extends Component {
    constructor(props) {
        super(props)
        this.filterSubjectList = this.filterSubjectList.bind(this)
        this.state = {
            id: this.props.match.params.id,
            subjects: [],
            semester: null,
            isLoading: false

        }
    }

    componentDidMount() {
        CourseDataService.retrieveAllCoursesWithSemMapping(this.state.id).then(
            response => {
                this.setState({
                    courses: response.data,
                });
            }
        );
        SemesterDataService.getSemesterById(this.state.id).then(res => {
            this.setState({
                semester: res.data
            })
        })
    }

    mapSubject() {
        const { courses, semester } = this.state
        let cList = []
        courses.forEach(course => {
            if (course.selected)
                cList.push(course)
        });
        const sem = {
            ...semester,
            "courseList": cList
        }
        SemesterDataService.mapSubject(sem).then(res => {
            setMsg(`Courses for ${semester.semester} Semester has been successfully mapped`, "success")
            this.props.history.push("/semester")
        })
    }
    checkSubject(id) {
        const { courses } = this.state
        this.setState({
            courses: courses.map(course => {
                let selected = course.selected
                console.log(selected)
                return course.id === id ? {
                    ...course, selected: !selected
                } : course
            })
        })
    }

    filterSubjectList(event) {
        this.setState({
            isLoading: true
        })
        const { courses } = this.state
        if (event.target.value.length >= 3) {
            CourseDataService.searchCourse(event.target.value).then(res => {
                const searchData = res.data
                this.setState({
                    courses: courses.map(course => {
                        return searchData.includes(course.id) ? course : {
                            ...course, visible: false
                        }
                    })
                })
            })
        } else {
            this.setState({
                courses: courses.map(course => {
                    return {
                        ...course, visible: true
                    }
                })
            })
        }
        this.setState({
            isLoading: false
        })

    }

    render() {
        const { courses, alert, semester, isLoading } = this.state
        let sn = 1
        if (courses && semester && !isLoading) {
            return (
                <div className="container">
                    {alert && (<Alert message={alert.msg} messageType={alert.msgType} />)}
                    <div>
                        <div style={{ float: "left", paddingLeft: 30 }}><h3 className="pull-left">Map Subjects for Semester:<b> {semester.semester}</b></h3></div>
                        <div style={{ float: "right", paddingRight: 30, paddingTop: 3, paddingBottom: 3 }}> <button className="btn btn-success" onClick={() => this.mapSubject()}>Map Subject</button></div>
                    </div>
                    <div className="container">
                        <div className="container" style={{ paddingBottom: 3 }}><input type="text" className="form-control" placeholder="Filter Subject" onChange={this.filterSubjectList} /></div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>S.N.</th>
                                    <th>Description</th>
                                    <th>Map Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courses.map(course =>
                                        course.visible && <tr key={course.id}>
                                            <td>{sn++}</td>
                                            <td>{course.description}</td>
                                            <td><input type="checkbox" onChange={() => this.checkSubject(course.id)} checked={course.selected} /></td>
                                        </tr>

                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            )
        } else {
            return (
                <img src={loading} alt="loading" />
            )
        }
    }
}

export default MapSemesterSubject
