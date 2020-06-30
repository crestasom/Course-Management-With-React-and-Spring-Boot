import React, { Component } from 'react'

class ErrorLanding extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
    }

    render() {

        return <h1>Server is not responding. Please Try Again Later</h1>

    }
}

export default ErrorLanding
