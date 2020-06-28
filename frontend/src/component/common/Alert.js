
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { clearMsg } from '../../actions/alertAction'
import React, { Component } from 'react'
import classnames from 'classnames';

class Alert extends Component {

    render() {
        console.log("rendering alert")
        const { message, messageType } = this.props.alert
        console.log(message)
        if (!message) {
            return null
        }
        return (
            <div className={classnames('alert', {
                'alert-success': messageType === 'success',
                'alert-danger': messageType === 'error',
            })}>
                {message}
            </div>
        );
    }
    componentWillUnmount() {
        console.log("unmounting alert component")
        this.props.clearMsg()
    }
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    clearMsg: PropTypes.func.isRequired
};
const mapStateToProps = ({ alert }) => {
    return { alert }
}
export default
    connect(mapStateToProps, { clearMsg })
        (Alert);
