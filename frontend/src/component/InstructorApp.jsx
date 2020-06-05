import React, { Component } from 'react'
import ListCoursesComponents from './ListCoursesComponents'
import CourseComponent from './CourseComponent'
import InstructorComponent from './InstructorComponent'
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom'
import Admin from './Admin'
import Example from './Example'
class InstructorApp extends Component {
   
    render() {
        return (
            <Router>
                <>
                    <h1>Instructor Application</h1>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home Page</Link>
                            </li>
                            <li>
                                <Link to="/admin">Admin Page</Link>
                            </li>
                        </ul>
                    </div>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponents} />
                        <Route path="/courses" exact component={ListCoursesComponents} />
                        <Route path="/courses/:id" component={CourseComponent} />
                        <Route path="/instructor/add" component={InstructorComponent} />
                        <Route path='/admin' exact component={Admin}/>
                    </Switch>
                </>
            </Router>
        )
    }
}



export default InstructorApp
