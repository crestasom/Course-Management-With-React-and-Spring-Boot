import React from 'react';

import UserService from '../../service/UserService';
import { setAuth } from '../../actions/authAction'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        if (props.isAuthenticated) {
            props.history.push("/")
        }
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            UserService.checkLogin(username, password).then(res => {
                if (res.status !== 200) {
                    if (res.status === 401) {
                        this.logout()
                    }
                } else {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    this.props.setAuth()
                    this.props.history.push("/")
                }
            })
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="container">
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
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAuth })(LoginPage)