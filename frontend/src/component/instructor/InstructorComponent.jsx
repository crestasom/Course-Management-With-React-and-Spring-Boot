import React, { Component } from 'react'
import { Form, Field, Formik } from 'formik'
import InstructorDataService from '../../service/InstructorDataService'
import Alert from '../common/Alert'
import { setMsg } from '../../actions/alertAction';


class InstructorComponent extends Component {
    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.validate = this.validate.bind(this)
        this.state = {
            id: this.props.match.params.id,
            userName: "",
            name: "",
            alert: null
        }
    }

    async validate(values) {
        let error = {}
        console.log(values)
        if (!values.userName) {
            error.description = "User Name cannot be blank"
        }
        else if (values.userName.length < 3) {
            error.description = "User Name should be atleast three character"
        }
        else if (!values.name) {
            error.description = "Name cannot be blank"
        } else {
            const res = await InstructorDataService.getInstructor(values.userName)
            if (res.data && res.data.id !== parseInt(values.id)) {
                error.description = `Username '${values.userName}' already exists. Please try different one.`
            }
        }
        console.log(error)
        if (error) {
            this.setState({
                alert: {
                    message: error.description, messageType: "error"
                }
            })
        }
        //window.alert(error.description)
        return error
    }
    save(values) {
        let instructor = {
            id: values.id,
            userName: values.userName,
            name: values.name
        }
        InstructorDataService.saveInstructor(instructor)
            .then(() => {
                if (values.id)
                    setMsg("Instructor updated successfully", "success")
                else
                    setMsg("Instructor added successfully", "success")
                this.props.history.push('/instructors')
            })

    }

    componentDidMount() {
        if (this.state.id === "-1") {
            return
        }
        InstructorDataService.getInstructorById(this.state.id)
            .then(res => {
                this.setState({
                    userName: res.data.userName,
                    name: res.data.name,
                })
            }
            )
    }

    render() {

        let { id, userName, name, alert } = this.state
        id = id === "-1" ? "" : id
        return (
            <div>
                <h2>{id ? "Update" : "Add"} Instructor</h2>
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
                            (props) => (
                                <Form>
                                    {/* <ErrorMessage name='description' component='div' className='alert alert-warning' /> */}
                                    {alert ? (<Alert message={alert.message} messageType={alert.messageType} />) : null}
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="hidden" name="id" />
                                    </fieldset>
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
            </div >

        )
    }
}

export default InstructorComponent
