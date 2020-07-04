import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMsg } from '../../actions/alertAction';
import { setTab } from '../../actions/authAction'
import Alert from '../common/Alert'
class ListStudentComponent extends Component {
    constructor(props) {
        super(props)
        this.props.setTab("Student")
        this.state = {
            alert: null,
            students: [
                {
                    id: 1,
                    name: "Ram",
                    email: "ram@gmail.com",
                    semester: "1st"
                },
                {
                    id: 2,
                    name: "Hari",
                    email: "hari@gmail.com",
                    semester: "2nd"
                }
            ]
        }
    }

    render() {
        console.log("inside student component")
        const { alert } = this.state
        return (
            <div className="container">
                <h3>All Students</h3>
                {alert && <Alert message={alert.message} messageType={alert.messageType} />}
                <div className="container">
                    <div className="row-full">
                        <tr>
                            <td><label style={{ marginRight: 5 }}>Filter By:</label></td>
                            <td> <select name="instructor" className="form-control" onChange={this.refreshCoursesByLecturer} style={{ marginRight: 5 }}>
                                <option value="1">Semester</option>
                                <option value="2">Student Name</option>
                                {/* {this.state.instructors.map(i =>
                                <option key={i.id} value={i.userName}>{i.name}</option>)} */}
                            </select>
                            </td>
                            <td><input type="text" id="filterText" className="form-control " onChange={() => this.refreshStudentList()} placeholder="Enter Text" style={{ marginLeft: 5 }} /></td>
                        </tr>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Semester</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.students.map(student =>
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.semester} </td>
                                        <td>
                                            <button className="btn btn-primary" data-toggle="tooltip" title="View Student Details" onClick={() => this.props.history.push(`/student/view/${student.id}`)} style={{ marginRight: 4 }}><i className="fas fa-info-circle" /></button>
                                            <button className="btn btn-success" data-toggle="tooltip" title="Update Student" onClick={() => this.props.history.push(`/student/add/${student.id}`)} style={{ marginRight: 4 }}><i className="far fa-edit" /></button>
                                            <button className="btn btn-warning" data-toggle="tooltip" title="Delete Student" onClick={() => this.deleteStudentClicked(student.id)} style={{ marginRight: 4 }}><i className="fas fa-trash-alt" /></button>
                                        </td>
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

ListStudentComponent.propTypes = {
    setTab: PropTypes.func.isRequired
}
export default connect(null, { setTab })(ListStudentComponent)
