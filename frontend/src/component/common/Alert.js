
import React, { Component } from 'react'
import classnames from 'classnames';
//import AlertMessage from 'react-flash-message'

class Alert extends Component {


    render() {
        const { message, messageType } = this.props
        if (!message) {
            return null
        }
        return (
            // <AlertMessage duration={5000} >
            <div className={classnames('alert', {
                'alert-success': messageType === 'success',
                'alert-danger': messageType === 'error',
            })}>

                {message}

            </div>
            // </AlertMessage >
        );
    }

}


export default Alert;
