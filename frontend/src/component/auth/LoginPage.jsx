import React from 'react';

import UserDataService from '../../service/UserDataService';
import { setAuth, clearAuth } from '../../actions/authAction'
import { setMsg, getMsg } from '../../actions/alertAction'
import { connect } from 'react-redux'

import { PropTypes } from 'prop-types'
import Alert from '../common/Alert';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("user") && props.isAuthenticated) {
            this.props.clearAuth()
            setMsg("Session expired. Please login again", "error")
        }
        if (props.isAuthenticated && localStorage.getItem("user")) {
            props.history.push("/")
        }
        this.state = {
            username: '',
            password: '',
            submitted: false,
            message: "",
            messageType: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value, message: "" })

    }
    static getDerivedStateFromProps(props, state) {
        return {
            alert: props.alert
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ submitted: true })
        const { username, password } = this.state
        if (username && password) {
            UserDataService.checkLogin(username, password).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data))
                this.props.setAuth()
                console.log(res.data.role)
                console.log(res.data.role === "ROLE_ADMIN")
                if (res.data.role === "ROLE_ADMIN") {
                    console.log("Admin Login")
                    this.props.history.push("/")
                } else if (res.data.role === "ROLE_STUDENT") {
                    console.log("Student Login")
                    this.props.history.push("/student/index")
                } else if (res.data.role === "ROLE_LECTURER") {
                    console.log("Lecturer Login")
                    this.props.history.push("/lecturer/index")
                }
            }).catch((error) => {
                this.setState({
                    message: error.response.data,
                    messageType: "error"
                })
            })
        }
    }

    componentDidMount() {
        const alert = getMsg()
        if (alert) {
            let { msg, msgType } = alert
            this.setState({
                message: msg, messageType: msgType
            })
        }
    }

    render() {
        const { username, password, submitted, message, messageType } = this.state;
        return (
            <div className="container">
                {message ? (<Alert message={message} messageType={messageType} />) : null}
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} autoFocus={true} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

LoginPage.propTypes = {
    setAuth: PropTypes.func.isRequired,
    clearAuth: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { setAuth, clearAuth })(LoginPage)