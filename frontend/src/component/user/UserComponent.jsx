import React, { Component } from 'react'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { setMsg } from '../../actions/alertAction'
import UserDataService from '../../service/UserDataService'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
            msg: ""
        }
    }

    save = (values) => {
        let instructor = {
            id: values.id,
            userName: values.userName,
            password: values.password
        }
        UserDataService.save(instructor).then(() => {
            console.log(this)
            if (values.id) {
                this.props.setMsg("User Updated Successfully", "success")
            } else {
                this.props.setMsg("Added New User Successfully", "success")
            }
            this.props.history.push('/users')
        })
    }

    validate = async (values) => {
        let errors = {}
        console.log(values)
        if (values.password !== values.confirmPassword) {
            //this.props.setMsg("Password and Confirm Password Doesnot Match", "error")
            this.setState({
                msg: "Password and Confirm Password Doesnot Match"
            })
            errors.description = "Password and Confirm Password Doesnot Match"
        } else if (values.id) {
            const res = await UserDataService.checkPassword(values.userName, values.oldPassword)
            console.log(res)
            if (!JSON.parse(res.data)) {
                //this.props.setMsg("Password and Confirm Password Doesnot Match", "error")
                this.setState({
                    msg: "Incorrect Old Password "
                })
                errors.description = "Incorrect Old Password "
            }
        }else {
            const res = await UserDataService.getUserByUserName(values.userName)
            if (res.data && res.data.id !== values.id) {
                //console.log("setting error")
                errors.description = `Username '${values.userName}' already exists. Please try different one.`
            } 
        }
        console.log(errors)
        return errors
    }
    static getDerivedStateFromProps(props, state) {
        return {
            alert: props.alert
        }
    }


    componentDidMount() {
        if (this.state.id === "-1") {
            return
        }

        UserDataService.getUserById(this.state.id)
            .then(res => {
                console.log(res)
                this.setState({
                    userName: res.data.username,
                    compPassword: res.data.password,
                })
            }
            )
    }

    render() {
        let { id, userName, password, confirmPassword, oldPassword } = this.state
        const { msg } = this.state
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
                                    {/* <ErrorMessage name='description' component='div' className='alert alert-warning' /> */}
                                    {msg ? (<Alert message={msg} messageType="error" />) : null}
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

UserComponent.propTypes = {
    alert: PropTypes.object.isRequired,
    setMsg: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    alert: state.alert
})

export default connect(mapStateToProps, { setMsg })(UserComponent)
