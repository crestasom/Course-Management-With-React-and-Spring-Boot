
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { clearMsg } from '../../actions/alertAction'
import React, { Component } from 'react'
import FlashMessage from 'react-flash-message'
import classnames from 'classnames';

class Alert extends Component {

    render() {
        console.log("rendering alert")
        const { message, messageType } = this.props
        console.log(message)
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
const mapStateToProps = (state) => ({
    message: state.alert.message,
    messageType: state.alert.messageType
})
export default
    connect(mapStateToProps, { clearMsg })
        (Alert);
