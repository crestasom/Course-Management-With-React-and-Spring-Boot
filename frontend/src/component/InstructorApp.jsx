import React, { Component } from 'react'
import ListCoursesComponents from './ListCoursesComponents'
import CourseComponent from './CourseComponent'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
class InstructorApp extends Component {
   
    render() {
        return (
            <Router>
                <>
                    <h1>Instructor Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponents} />
                        <Route path="/courses" exact component={ListCoursesComponents} />
                        <Route path="/courses/:id" component={CourseComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}



export default InstructorApp
