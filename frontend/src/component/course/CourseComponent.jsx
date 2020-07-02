import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../../service/CourseDataService';
import InstructorDataService from '../../service/InstructorDataService';
import { setMsg } from '../../actions/alertAction'

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
        InstructorDataService.getInstructors().then(
            response => {
                this.setState({
                    instructors: response.data,
                    //  instructor: response.data[0].userName
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
        let username = values.instructor
        let course = {
            id: values.id,
            description: values.description,
            targetDate: values.targetDate
        }
        CourseDataService.createCourse(username, course).then(res => {
            if (!values.id)
                setMsg("Course added successfully", "success")
            else
                setMsg("Course updated successfully", "success")
            this.props.history.push('/')
        })
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
                                        <label>Instructor</label>
                                        <Field component="select" className="form-control" name="instructor">
                                            <option value="0">---</option>
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