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
import AssignmentComponent from './assignment/AssignmentComponent'
import CourseDetailsComponent from './course/CourseDetailsComponent'
import ErrorBoundry from './common/ErrorBoundry'
import ErrorLanding from './common/ErrorLanding'
import SemesterComponent from './semester/SemesterComponent'
import ListSemesterComponent from './semester/ListSemesterComponent'
import MapSemesterSubject from './semester/MapSemesterSubject'
import NavBarDemo from './common/NavBarDemo'
import ListStudentComponent from './student/ListStudentComponent'
import StudentComponent from './student/StudentComponent'
import StudentRoute from './common/StudentRoute'
import StudentIndex from './student/StudentIndex'



class CourseApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <>
                            <ErrorBoundry>
                                <AppNavBar />
                            </ErrorBoundry>
                            <Switch>
                                <Route path="/server-error" exact component={ErrorLanding} />
                                <Route path="/" exact component={ListCoursesComponents} />
                                <StudentRoute path="/student/index" exact component={StudentIndex} />
                                <AdminRoute path="/student" exact component={ListStudentComponent} />
                                <AdminRoute path="/student/add/:id" exact component={StudentComponent} />
                                <AdminRoute path="/semester/add/:id" exact component={SemesterComponent} />
                                <AdminRoute path="/semester" exact component={ListSemesterComponent} />
                                <AdminRoute path="/semester/map/:id" exact component={MapSemesterSubject} />

                                <PrivateRoute path="/course/add/:id" component={CourseComponent} />
                                <PrivateRoute path="/course/view/:id" component={CourseDetailsComponent} />
                                <PrivateRoute path="/lecturer/add/:id" component={InstructorComponent} />
                                <PrivateRoute path="/lecturer" component={ListInstructorComponent} />
                                <PrivateRoute path="/course/:cid/assignment/add/:id" component={AssignmentComponent} />
                                <Route path='/login' exact component={LoginPage} />
                                <Route path='/navbar-demo' exact component={NavBarDemo} />
                                <Route path='/logout' exact component={Logout} />
                                <Route path='/jeasygrid' exact component={JeasyGrid} />
                                <ErrorBoundry>
                                    <AdminRoute path="/user/add/:id" component={UserComponent} />
                                    <AdminRoute path="/users" component={ListUserComponent} />
                                </ErrorBoundry>
                            </Switch>
                        </>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}



export default CourseApp
