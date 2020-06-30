import UserDataService from '../../service/UserDataService'
import React from 'react'
import { connect } from 'react-redux'
import { clearAuth } from '../../actions/authAction';
import { setMsg } from '../../actions/alertAction';
import PropTypes from 'prop-types'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        UserDataService.logout();
        setMsg("You are now logged out", "success")
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