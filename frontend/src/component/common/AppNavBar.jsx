import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AppNavBar extends Component {
    state = {
        isAuthenticated: false,
        role: "",
        tab: "Course"
    }


    static getDerivedStateFromProps(props, state) {
        const { isAuthenticated, role, tab } = props
        return {
            isAuthenticated,
            role,
            tab

        }
    }


    render(props) {
        const { isAuthenticated, role, tab } = this.state
        const username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className='container'>
                    <Link to="/" className="navbar-brand">
                        Course Management
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
                            {role === "ROLE_ADMIN" ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/instructors" className="nav-link">Instructors</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/semester" className="nav-link">Semester</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/student" className="nav-link">Students</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/users" className="nav-link">Users</Link>
                                    </li>
                                </>

                            ) : null}
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {role === "ROLE_ADMIN" ? (
                                <>

                                    <li className="nav-item">
                                        <Link to={`/${tab}/add/-1`} className="nav-link">Add {tab}</Link>
                                    </li>
                                </>
                            ) : null}
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item"> <Link to={`/${tab}/add/-1`} className="nav-link">Hello {username}</Link></li>
                                    <li className="nav-item">
                                        <Link to="/logout" className="nav-link">Logout</Link>

                                    </li>
                                </>
                            ) :
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>}
                        </ul>

                    </div>
                </div>
            </nav>
        )
    }
}

AppNavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    tab: state.auth.tab
})
export default connect(mapStateToProps)(withRouter(AppNavBar))
