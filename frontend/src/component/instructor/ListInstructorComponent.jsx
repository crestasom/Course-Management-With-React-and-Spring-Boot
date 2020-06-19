import React, { Component } from 'react'
import InstructorDataService from '../../service/InstructorDataService'
import Alert from '../common/Alert'
import { setMsg, clearMsg } from '../../actions/alertAction';
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
        alert: null,
    }

    static getDerivedStateFromProps(props, state) {
        return {
            alert: props.alert,
            //instructors: props.instructors
        }
    }

    deleteInstructorClicked(id) {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            InstructorDataService.deleteInstructor(id)
                .then(
                    response => {
                        this.props.setMsg(`Delete of instructor ${id} Successful`, "success")
                        this.setState({
                            instructors: this.state.instructors.filter(instructor =>
                                instructor.id !== id)
                        })
                    }
                ).catch((error) => {
                    console.log(error.response)
                    this.props.setMsg("Cannot Delete Instructor with Courses Assigned!!!Please delete assigned courses first", "error")
                    console.log("error set")

                })
        }
    }
    componentDidMount() {
        this.getInstructors()
    }
    render() {
        const { instructors } = this.state
        const { message, messageType } = this.state.alert
        return (
            <div className="container">
                {message ? (<Alert message={message} messageType={messageType} />) : null}
                <div className="pull-left"><h3 className="pull-left">All Instructor</h3></div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>UserName</th>
                                <th>Update</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                instructors.map(instructor =>
                                    <tr key={instructor.id}>
                                        <td>{instructor.id}</td>
                                        <td>{instructor.name}</td>
                                        <td>{instructor.userName}</td>
                                        <td><button className="btn btn-success" onClick={() => this.props.history.push(`/instructor/add/${instructor.id}`)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteInstructorClicked(instructor.id)}>Delete</button></td>
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
    setMsg: PropTypes.func.isRequired,
    alert: PropTypes.object.isRequired,
    setTab: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    alert: state.alert,
})

export default connect(mapStateToProps, { setMsg, clearMsg, setTab })(ListInstructorComponent)
