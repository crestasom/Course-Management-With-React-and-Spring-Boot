import React, { Component } from 'react'
import Alert from '../common/Alert'
import { getMsg } from '../../actions/alertAction';
import { setTab } from '../../actions/authAction'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import UserDataService from '../../service/UserDataService'
class ListUserComponent extends Component {
    constructor(props) {
        super(props)
        this.props.setTab("User")
        this.state = {
            users: [],
            alert: null,


        }
    }
    getUsers() {
        UserDataService.getUsers().then(
            res => {
                this.setState({
                    users: res.data
                })
            }
        )
    }



    deleteUserClicked(id) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            UserDataService.deleteUser(id).then(res => {
                if (!res.data) {
                    this.setState({
                        users: this.state.users.filter(user => user.id !== id),
                        alert: {
                            msg: "User Deleted Successfully",
                            msgType: "success"
                        }
                    })


                } else {
                    this.setState({
                        msg: res.data, msgType: "error"
                    })

                }
            })
        }
    }


    componentDidMount() {

        this.getUsers()
        const alert = getMsg()
        this.setState({
            alert: alert
        })
    }

    getder

    render() {
        const { users, alert } = this.state

        return (
            <div className="container">
                {alert ? (<Alert message={alert.msg} messageType={alert.msgType} />) : null}
                <div className="pull-left"><h3 className="pull-left">All Users</h3></div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.userName}</td>
                                        <td>
                                            <button className="btn btn-success" data-toggle="tooltip" title="Update User" onClick={() => this.props.history.push(`/instructor/add/${user.id}`)} style={{ marginRight: 4 }}><i className="far fa-edit" /></button>
                                            <button className="btn btn-danger" data-toggle="tooltip" title="Delete User" onClick={() => this.deleteUserClicked(user.id)} style={{ marginRight: 4 }}><i className="fas fa-trash-alt" /></button>
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

ListUserComponent.propTypes = {
    setTab: PropTypes.func.isRequired
}

export default connect(null, { setTab })(ListUserComponent)
