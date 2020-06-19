import React from 'react';

import UserDataService from '../../service/UserDataService';
import { setAuth } from '../../actions/authAction'
import { setMsg, clearMsg } from '../../actions/alertAction';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Alert from '../common/Alert';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        if (props.isAuthenticated) {
            props.history.push("/")
        }
        this.state = {
            username: '',
            password: '',
            submitted: false,
            alert: null
        }
        this.props.clearMsg()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
        this.props.clearMsg()
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
                this.props.history.push("/")
            }).catch((error) => {
                console.log(error.response.data)
                this.props.setMsg(error.response.data, "error")
                console.log("error set")

            })
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        const { message, messageType } = this.state.alert

        return (
            <div className="container">
                {message ? (<Alert message={message} messageType={messageType} />) : null}
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
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
    setMsg: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    alert: state.alert,
})
export default connect(mapStateToProps, { setAuth, setMsg, clearMsg })(LoginPage)