import React, { Component } from 'react'
import ListCoursesComponents from './course/ListCoursesComponents'
import CourseComponent from './course/CourseComponent'
import InstructorComponent from './instructor/InstructorComponent'
import LoginPage from './auth/LoginPage'
import Logout from './auth/Logout'
import { PrivateRoute } from './common/PrivateRoute'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppNavBar from './common/AppNavBar'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../storeConfig'

class CourseApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
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
                </PersistGate>
            </Provider>
        )
    }
}



export default CourseApp
