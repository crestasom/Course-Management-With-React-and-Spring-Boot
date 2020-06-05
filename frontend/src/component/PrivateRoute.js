import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )}
        />
    );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;