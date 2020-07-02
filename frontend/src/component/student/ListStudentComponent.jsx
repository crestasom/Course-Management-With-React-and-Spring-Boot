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
                },
                {
                    id: 2,
                    name: "Hari",
                    email: "hari@gmail.com",
                }
            ]
        }
    }

    render() {
        const { alert } = this.state
        return (
            <div className="container">
                <h3>All Students</h3>
                {alert && <Alert message={alert.message} messageType={alert.messageType} />}
                <div className="container">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Veiw Details</th>
                                <th>Update</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.students.map(student =>
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email} </td>
                                        <td><button className="btn btn-primary btn-block" onClick={() => this.props.history.push(`/student/view/${student.id}`)}>View</button></td>
                                        <td><button className="btn btn-success btn-block" onClick={() => this.props.history.push(`/student/add/${student.id}`)}>Update</button></td>
                                        <td><button className="btn btn-warning btn-block" onClick={() => this.deleteCourseClicked(student.id)}>Delete</button></td>
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
