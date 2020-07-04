import React, { Component } from 'react'
import InstructorDataService from '../../service/InstructorDataService'
import Alert from '../common/Alert'
import { setMsg, getMsg } from '../../actions/alertAction'
import { setTab } from '../../actions/authAction'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
class ListInstructorComponent extends Component {
    constructor(props) {
        super(props)
        this.props.setTab("Instructor")

    }

    getInstructors() {
        InstructorDataService.getInstructors().then(
            res => {
                this.setState({
                    instructors: res.data
                })
            }
        )
    }

    state = {
        instructors: [],
        message: "",
        messageType: ""
    }



    deleteInstructorClicked(id) {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            InstructorDataService.deleteInstructor(id)
                .then(
                    response => {
                        setMsg(`Delete of instructor ${id} Successful`, "success")
                        this.setState({
                            instructors: this.state.instructors.filter(instructor =>
                                instructor.id !== id)
                        })
                    }
                ).catch((error) => {
                    console.log(error.response)
                    this.setState({
                        message: "Cannot Delete Instructor with Courses Assigned!!!Please delete assigned courses first",
                        messageType: "error"
                    })

                })
        }
    }
    componentDidMount() {
        this.getInstructors()
        const alert = getMsg()
        if (alert) {
            const { msg, msgType } = alert
            this.setState({
                message: msg, messageType: msgType
            })
        }
    }
    render() {
        const { instructors } = this.state
        const { message, messageType } = this.state
        let sn = 1
        return (
            <div className="container">
                {message && (<Alert message={message} messageType={messageType} />)}
                <div className="pull-left"><h3 className="pull-left">All Instructor</h3></div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.N.</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                instructors.map(instructor =>
                                    <tr key={instructor.id}>
                                        <td>{sn++}</td>
                                        <td>{instructor.name}</td>
                                        <td>{instructor.userName}</td>
                                        <td>
                                            <button className="btn btn-success" data-toggle="tooltip" title="Update Instructor" onClick={() => this.props.history.push(`/instructor/add/${instructor.id}`)} style={{ marginRight: 4 }}><i className="far fa-edit" /></button>
                                            <button className="btn btn-warning" data-toggle="tooltip" title="Delete Instructor" onClick={() => this.deleteInstructorClicked(instructor.id)} style={{ marginRight: 4 }}><i className="fas fa-trash-alt" /></button>
                                        </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className="row">

                </div>

            </div>
        )
    }
}

ListInstructorComponent.propTypes = {
    setTab: PropTypes.func.isRequired
}



export default connect(null, { setTab })(ListInstructorComponent)
