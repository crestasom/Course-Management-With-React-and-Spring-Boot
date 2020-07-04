import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === "ROLE_ADMIN"
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
AdminRoute.propTypes = {
    role: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    role: state.auth.role
})
export default connect(mapStateToProps)(AdminRoute)