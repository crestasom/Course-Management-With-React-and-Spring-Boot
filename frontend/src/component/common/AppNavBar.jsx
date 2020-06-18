import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AppNavBar extends Component {
    state = {
        isAuthenticated: false,
        isAdmin: false,
        tab: "Course"
    }


    static getDerivedStateFromProps(props, state) {
        const { isAuthenticated, isAdmin, tab } = props
        return {
            isAuthenticated,
            isAdmin,
            tab

        }
    }


    render(props) {
        const { isAuthenticated, isAdmin, tab } = this.state
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
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
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <Link to="/instructors" className="nav-link">Instructors</Link>
                                </li>

                            ) : null}
                            {isAdmin ? (
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link">Users</Link>
                                </li>

                            ) : null}
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item"> <Link to={`/${tab}/add/-1`} className="nav-link">Hello {JSON.parse(localStorage.getItem("user")).username}</Link></li>
                                    <li className="nav-item">
                                        <Link to={`/${tab}/add/-1`} className="nav-link">Add {tab}</Link>
                                    </li>
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
    isAdmin: PropTypes.bool.isRequired,
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    tab: state.auth.tab
})
export default connect(mapStateToProps)(withRouter(AppNavBar))
