import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import UserService from '../service/UserService'
import { isAuth } from '../actions/authAction'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
class AppNavBar extends Component {
    state = {
        isAuthenticated: false
    }


    static getDerivedStateFromProps(props, state) {
        const { isAuthenticated } = props
        return {
            isAuthenticated: isAuthenticated
        }
    }


    render(props) {
        const { isAuthenticated } = this.state
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className='container'>
                    <Link to="/" className="navbar-brand">
                        ClientPanel
                    </Link>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <Link to="/" className="nav-link">Dashboard</Link>
                            </li>

                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <a href="#!" className="nav-link" onClick={() => this.props.history.push("/Logout")}>
                                        Logout
                                    </a>
                                </li>) :
                                <li className="nav-item">
                                    <a href="#!" className="nav-link" onClick={() => this.props.history.push("/login")}>
                                        Login
                                    </a>
                                </li>}
                        </ul>

                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(withRouter(AppNavBar))
