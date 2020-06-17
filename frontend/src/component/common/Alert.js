
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { clearMsg } from '../../actions/alertAction'
import React, { Component } from 'react'
import FlashMessage from 'react-flash-message'
import classnames from 'classnames';

class Alert extends Component {

    render() {
        const { message,messageType } = this.props
        return (
            <FlashMessage duration={5000}>
               <div className={classnames('alert', {
                    'alert-success': messageType === 'success',
                    'alert-danger': messageType === 'error',
                })}>
                    {message}
                </div>
            </FlashMessage>
        );
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
        this.props.clearMsg()
    }
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    clearMsg:PropTypes.func.isRequired
   
};
const mapStateToProps = (state) => ({
    message: state.alert.message,
    messageType:state.alert.messageType
})
export default 
    connect(mapStateToProps, { clearMsg })
(Alert);
