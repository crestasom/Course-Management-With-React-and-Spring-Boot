import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const StudentRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === "ROLE_STUDENT"
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default StudentRoute