import React, { Component } from 'react'
import ListCoursesComponents from './course/ListCoursesComponents'
import CourseComponent from './course/CourseComponent'
import InstructorComponent from './instructor/InstructorComponent'
import LoginPage from './auth/LoginPage'
import Logout from './auth/Logout'
import { PrivateRoute } from './common/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppNavBar from './common/AppNavBar'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../storeConfig'
import AdminRoute from './common/AdminRoute'
import UserComponent from './user/UserComponent'
import ListUserComponent from './user/ListUserComponent'
import ListInstructorComponent from './instructor/ListInstructorComponent'
import JeasyGrid from '../component/common/JeasyGrid'



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
                                <PrivateRoute path="/course/add/:id" component={CourseComponent} />
                                <PrivateRoute path="/instructor/add/:id" component={InstructorComponent} />
                                <PrivateRoute path="/instructors" component={ListInstructorComponent} />
                                <Route path='/login' exact component={LoginPage} />
                                <Route path='/logout' exact component={Logout} />
                                <Route path='/jeasygrid' exact component={JeasyGrid} />
                                <AdminRoute path="/user/add/:id" component={UserComponent} />
                                <AdminRoute path="/users" component={ListUserComponent} />
                            </Switch>
                        </>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}



export default CourseApp
