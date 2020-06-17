import UserService from '../../service/UserService'
import React from 'react'
import { connect } from 'react-redux'
import { clearAuth } from '../../actions/authAction';
import PropTypes from 'prop-types'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        UserService.logout();
        props.clearAuth();
        props.history.push("/")
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

Logout.propTypes = {
    clearAuth: PropTypes.func.isRequired
}
export default connect(null, { clearAuth })(Logout)