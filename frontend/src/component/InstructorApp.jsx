import React, { Component } from 'react'
import ListCoursesComponents from './ListCoursesComponents'
import CourseComponent from './CourseComponent'
import InstructorComponent from './InstructorComponent'
import LoginPage from './LoginPage'
import Logout from './Logout'
import { PrivateRoute } from './PrivateRoute'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppNavBar from './AppNavBar'
import { Provider } from 'react-redux'
import store from '../store'

class InstructorApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <>
                        <AppNavBar />
                        <Switch>
                            <Route path="/" exact component={ListCoursesComponents} />
                            <PrivateRoute path="/courses/:id" component={CourseComponent} />
                            <PrivateRoute path="/instructor/add" component={InstructorComponent} />
                            <Route path='/login' exact component={LoginPage} />
                            <Route path='/logout' exact component={Logout} />
                        </Switch>
                    </>
                </Router>
            </Provider>
        )
    }
}



export default InstructorApp
