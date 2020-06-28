import React, { Component } from 'react'
import Alert from '../common/Alert'
import { setMsg, clearMsg } from '../../actions/alertAction';
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
            alert: null

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

    componentWillUnmount() {
        this.props.clearMsg()
    }
    static getDerivedStateFromProps(props, state) {
        return {
            alert: props.alert,
            //instructors: props.instructors
        }
    }

    deleteUserClicked(id) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            UserDataService.deleteUser(id).then(res => {
                this.setState({
                    users: this.state.users.filter(user => user.id !== id)
                })
                this.props.setMsg("User Deleted Successfully", "Success")
            })
        }
    }


    componentDidMount() {
        this.getUsers()
    }
    render() {
        const { users } = this.state
        const { message, messageType } = this.state.alert
        return (
            <div className="container">
                {message ? (<Alert message={message} messageType={messageType} />) : null}
                <div className="pull-left"><h3 className="pull-left">All Users</h3></div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Name</th>
                                <th>Update</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td><button className="btn btn-success" onClick={() => this.props.history.push(`/user/add/${user.id}`)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteUserClicked(user.id)}>Delete</button></td>
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
    setMsg: PropTypes.func.isRequired,
    alert: PropTypes.object.isRequired,
    setTab: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    alert: state.alert,
})

export default connect(mapStateToProps, { setMsg, clearMsg, setTab })(ListUserComponent)
