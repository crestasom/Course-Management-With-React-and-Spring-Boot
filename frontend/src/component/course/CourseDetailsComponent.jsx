import React, { Component } from 'react'
import CourseDataService from '../../service/CourseDataService'
import AssignmentDataService from '../../service/AssignmentDataService'
import { getMsg } from '../../actions/alertAction';
import Alert from '../common/Alert'
import moment from "moment"
import loading from '../../img/loading.gif'
const BACKEND_API_URL = 'http://localhost:8085'
class CourseDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: "",
            instructor: "",
            assignments: [],
            message: "",
            messageType: ""

        }
    }


    componentDidMount() {
        CourseDataService.getCourse(this.state.id).then(res => {
            this.setState({
                description: res.data.description,
                instructor: res.data.instructor.name
            })
        })

        AssignmentDataService.getAll().then(res => {
            this.setState({
                assignments: res.data
            })
        })

        const alert = getMsg()
        if (alert) {
            this.setState({
                message: alert.msg,
                messageType: alert.msgType
            })
        }
    }

    downloadFile(path) {
        AssignmentDataService.getFile(path).then(response => {
            window.open(response.data);
        })
    }
    deleteAssignmentClicked(id) {
        if (window.confirm("Are you sure you want to delete this course?")) {
            AssignmentDataService.deleteAssignment(id)
                .then(
                    () => {
                        this.setState({
                            assignments: this.state.assignments.filter(assignment => assignment.id !== id),
                            message: `Delete of assignment ${id} Successful`,
                            messageType: "success",
                        })
                    }
                )
        }
    }

    render() {
        const { id, description, instructor, assignments, message, messageType } = this.state

        if (description) {
            let sn = 1
            return (
                <div className="container">
                    {message ? (<Alert message={message} messageType={messageType} />) : null}
                    <h3>Course Details: {description}</h3>

                    <div className="col-xs-12 ">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td> Id</td>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <td> Description</td>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <td> Instructor</td>
                                    <td>{instructor}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-1 text-center"><h3>All Assignments</h3></div>
                                <button className="btn btn-primary ml-auto mr-3" onClick={() => this.props.history.push(`/course/${id}/assignment/add/-1`)}>Add New Assignment</button>
                            </div>
                            <div className="container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>S.N.</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Upload Date</th>
                                            <th>Due Date</th>
                                            <th>Download Assignment</th>
                                            <th>Delete Assignment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            assignments.map(assignment =>
                                                <tr key={assignment.id}>
                                                    <td>{sn++}</td>
                                                    <td>{assignment.name}</td>
                                                    <td>{assignment.description}</td>
                                                    <td>{moment(assignment.uploadDate).format("YYYY-MM-DD")}</td>
                                                    <td>{assignment.dueDate}</td>
                                                    <td><a className="btn btn-secondary" href={`${BACKEND_API_URL}/assignments/getfile?path=${encodeURI(assignment.filePath)}`}>Download</a></td>
                                                    <td><button className="btn btn-warning" onClick={() => this.deleteAssignmentClicked(assignment.id)}>Delete</button></td>

                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            console.log("loading")
            return (
                <div>
                    <img src={loading}></img>
                </div >
            )
        }
    }
}

export default CourseDetailsComponent
