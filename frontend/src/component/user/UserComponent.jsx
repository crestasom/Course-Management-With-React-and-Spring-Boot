import React, { Component } from 'react'
import { Form, Field, Formik } from 'formik'
import { setMsg } from '../../actions/alertAction'
import UserDataService from '../../service/UserDataService'

import Alert from '../common/Alert'
class UserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            userName: "",
            password: "",
            confirmPassword: "",
            oldPassword: "",
            compPassword: "",
            msg: "",
            alert: null
        }
    }

    save = (values) => {
        let user = {
            id: values.id,
            userName: values.userName,
            password: values.password
        }
        console.log(user)
        UserDataService.save(user).then(() => {
            if (values.id) {
                setMsg("User Updated Successfully", "success")
            } else {
                setMsg("User Added Successfully", "success")
            }
            this.props.history.push('/users')
        })
    }

    validate = async (values) => {
        let errors = {}
        if (!values.userName) {
            errors.description = "Username cannot be empty"
        } else if (values.userName.length < 3) {
            errors.description = "Username must be atleast three character"
        } else if (!values.password) {
            errors.description = "Password cannot be empty"
        }
        else if (!values.confirmPassword) {
            errors.description = " Confirm Password cannot be empty"
        }
        else if (values.password !== values.confirmPassword) {
            errors.description = "Password and Confirm Password Doesnot Match"
        } else if (values.id) {
            const res = await UserDataService.checkPassword(values.userName, values.oldPassword)
            if (!JSON.parse(res.data)) {
                errors.description = "Incorrect Old Password "
            }
        } else {
            const res = await UserDataService.getUserByUserName(values.userName)
            if (res.data && res.data.id !== parseInt(values.id)) {
                errors.description = `Username '${values.userName}' already exists. Please try different one.`
            }
        }
        if (errors)
            this.setState({
                alert: {
                    message: errors.description, messageType: "error"
                }
            })
        return errors
    }


    componentDidMount() {
        if (this.state.id === "-1") {
            return
        }

        UserDataService.getUserById(this.state.id)
            .then(res => {
                console.log(res)
                this.setState({
                    userName: res.data.userName,
                })
            }
            )
    }
    render() {
        let { id, userName, password, confirmPassword, oldPassword, alert } = this.state
        id = id === "-1" ? "" : id
        return (
            <div>
                <h2>{id ? "Update " : "Add New "}User</h2>
                <div className="container">
                    <Formik
                        initialValues={{ id, userName, password, confirmPassword, oldPassword }}
                        onSubmit={this.save}
                        validate={this.validate}
                        enableReinitialize={true}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {
                            () => (
                                <Form>

                                    {alert ? (<Alert message={alert.message} messageType={alert.messageType} />) : null}
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field type="text" name="userName" className="form-control" />
                                    </fieldset>
                                    {id !== "" ? (
                                        <fieldset className="form-group">
                                            <label>Confirm  Old Password</label>
                                            <Field type="password" name="oldPassword" className="form-control" />
                                        </fieldset>
                                    ) : null}

                                    <fieldset className="form-group">
                                        <label>{id !== "" ? "New " : null}Password</label>
                                        <Field type="password" name="password" className="form-control" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Confirm {id !== "" ? "New " : null} Password</label>
                                        <Field type="password" name="confirmPassword" className="form-control" />
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



export default UserComponent
