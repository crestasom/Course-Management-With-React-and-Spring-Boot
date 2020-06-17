import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../../service/CourseDataService';



class CourseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            instructors: [],
            instructor: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        // eslint-disable-next-line
        CourseDataService.getInstructors().then(
            response => {
                this.setState({
                    instructors: response.data,
                    instructor: response.data[0].userName
                })
            }

        )
        if (this.state.id === "-1") {
            return
        }

        CourseDataService.getCourse(this.state.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    instructor: response.data.instructor.userName
                })
            })


    }

    onSubmit(values) {
        console.log(values)
        let username = values.instructor
        let course = {
            id: values.id,
            description: values.description,
            targetDate: values.targetDate
        }
        //if (this.state.id === -1) {
        CourseDataService.createCourse(username, course).then(() => this.props.history.push('/'))
        //  } else {
        //     CourseDataService.updateCourse(username, this.state.id, course).then(() => this.props.history.push('/courses'))
        // }
    }

    validate(values) {
        let error = {}
        if (!values.description) {
            error.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            error.description = "Enter atleast 5 character"
        }
        return error
    }

    render() {

        let { description, id, instructor, instructors } = this.state
        id = id === '-1' ? "" : id
        return (
            <div>
                <h3>Add New Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, description, instructor }}
                        onSubmit={this.onSubmit}
                        enableReinitialize={true}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name='description' component='div' className='alert alert-warning' />
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="hidden" name="id" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset>
                                        <Field component="select" className="form-control" name="instructor">
                                            {instructors.map(i =>
                                                <option key={i.id} value={i.userName}>{i.name}</option>
                                            )}
                                        </Field>
                                    </fieldset>
                                    <button className="btn btn-success" onSubmit={() => this.onSubmit()} type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default CourseComponent