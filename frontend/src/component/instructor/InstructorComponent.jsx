import React, { Component } from 'react'
import { withFormik, Form, Field, Formik, ErrorMessage } from 'formik'
import InstructorDataService from '../../service/InstructorDataService'
class InstructorComponent extends Component {
    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.validate = this.validate.bind(this)

        this.state = {
            id: "",
            userName: "",
            name: ""

        }
    }
    validate(values) {
        let error = {}
        if (!values.userName) {
            error.description = "User Name cannot be blank"
        }
        else if (values.userName.length < 3) {
            error.description = "User Name should be atleast three character"
        }
        else if (!values.name) {
            error.description = "Name cannot be blank"
        }
        return error
    }
    save(values) {
        let instructor = {
            userName: values.userName,
            name: values.name
        }
        InstructorDataService.saveInstructor(instructor).then(() => { this.props.history.push('/') })
    }

    render() {
        let { id, userName, name } = this.state
        return (
            <div>
                <h2>Add New Instructor</h2>
                <div className="container">
                    <Formik
                        initialValues={{ id, userName, name }}
                        onSubmit={this.save}
                        enableReinitialize={true}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {
                            () => (
                                <Form>
                                    <ErrorMessage name='description' component='div' className='alert alert-warning' />
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field type="text" name="userName" className="form-control" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field type="text" name="name" className="form-control" />
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>

        )
    }
}



export default InstructorComponent
