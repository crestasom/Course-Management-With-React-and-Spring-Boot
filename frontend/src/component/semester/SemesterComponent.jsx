import React, { Component } from 'react'
import { Form, Field, Formik } from 'formik'
import Alert from '../common/Alert'
import { setMsg } from '../../actions/alertAction'
import SemesterDataService from '../../service/SemesterDataService'
class SemesterComponent extends Component {
    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.validate = this.validate.bind(this)
        this.state = {
            id: this.props.match.params.id,
            semesterName: "",
            semester: "",
            alert: ""
        }
    }

    validate(values) {
        let error = {}
        console.log(values)
        if (!values.semesterName) {
            error.description = "Semester Name cannot be blank"
        }
        else if (!values.semester) {
            error.description = "Semester cannot be blank"
        }
        // } else {
        //     const res = await InstructorDataService.getInstructor(values.userName)
        //     if (res.data && res.data.id !== parseInt(values.id)) {
        //         error.description = `Username '${values.userName}' already exists. Please try different one.`
        //     }
        // }
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
        let semester = {
            id: values.id,
            semesterName: values.semesterName,
            semester: values.semester
        }
        SemesterDataService.saveSemester(semester)
            .then(() => {
                if (values.id)
                    setMsg("Semester updated successfully", "success")
                else
                    setMsg("Semester added successfully", "success")
                this.props.history.push('/semester')
            })

    }

    componentDidMount() {
        if (this.state.id === "-1") {
            return
        }
        SemesterDataService.getSemesterById(this.state.id)
            .then(res => {
                this.setState({
                    semester: res.data.semester,
                    semesterName: res.data.semesterName,
                })
            }
            )
    }

    render() {
        let { id, semesterName, semester, alert } = this.state
        id = id === "-1" ? "" : id
        return (
            <div>
                <h2>{id ? "Update" : "Add"} Semester</h2>
                <div className="container">
                    <Formik
                        initialValues={{ id, semesterName, semester }}
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
                                        <label>Semester Name</label>
                                        <Field type="text" name="semesterName" className="form-control" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Semester</label>
                                        <Field type="text" name="semester" className="form-control" />
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

export default SemesterComponent
