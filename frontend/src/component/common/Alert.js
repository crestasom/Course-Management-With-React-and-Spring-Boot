
import React, { Component } from 'react'
import classnames from 'classnames';

class Alert extends Component {

    render() {
        const { message, messageType } = this.props
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
    
}


export default Alert;
