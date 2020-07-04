import React, { Component } from 'react'
import Alert from '../common/Alert'
import { setMsg, getMsg } from '../../actions/alertAction'
import SemesterDataService from '../../service/SemesterDataService'
import { setTab } from '../../actions/authAction'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

class ListSemesterComponent extends Component {
    constructor(props) {
        super(props)
        this.props.setTab("Semester")
        this.state = {
            semesters: [],
            alert: null
        }
    }

    deleteSemesterClicked(id) {
        if (window.confirm("Are you sure you want to delete this Semester?")) {
            SemesterDataService.deleteSemester(id)
                .then(
                    response => {
                        setMsg(`Delete of semester ${id} Successful`, "success")
                        this.setState({
                            semesters: this.state.semesters.filter(semester =>
                                semester.id !== id)
                        })
                    }
                ).catch((error) => {
                    console.log(error.response)
                    this.setState({
                        message: "Cannot Delete Semester",
                        messageType: "error"
                    })

                })
        }
    }
    componentDidMount() {
        SemesterDataService.getSemesterData().then(res => {
            this.setState({
                semesters: res.data,
                alert: getMsg()
            })
        })
    }

    render() {
        const { semesters, alert } = this.state
        let sn = 1
        return (
            <div className="container">
                {alert && (<Alert message={alert.msg} messageType={alert.msgType} />)}
                <div className="pull-left"><h3 className="pull-left">Semester List</h3></div>
                <div className="container">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>S.N.</th>
                                <th>Name</th>
                                <th>Semester Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                semesters.map(semester =>
                                    <tr key={semester.id}>
                                        <td>{sn++}</td>
                                        <td>{semester.semester}</td>
                                        <td>{semester.semesterName}</td>
                                        <td>
                                            <button className="btn btn-primary" data-toggle="tooltip" title="Map Semester Subjects" onClick={() => this.props.history.push(`/semester/map/${semester.id}`)} style={{ marginRight: 4 }}><i className="fas fa-link" /></button>
                                            <button className="btn btn-success" data-toggle="tooltip" title="Update Semester" onClick={() => this.props.history.push(`/instructor/add/${semester.id}`)} style={{ marginRight: 4 }}><i className="far fa-edit" /></button>
                                            <button className="btn btn-warning" data-toggle="tooltip" title="Delete Semester" onClick={() => this.deleteSemesterClicked(semester.id)} style={{ marginRight: 4 }}><i className="fas fa-trash-alt" /></button>
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

ListSemesterComponent.propTypes = {
    setTab: PropTypes.func.isRequired
}

export default connect(null, { setTab })(ListSemesterComponent)
