import React, { Component } from 'react'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { setMsg } from '../../actions/alertAction'
import UserService from '../../service/UserService'
import { connect } from 'react-redux'
class UserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            userName: "",
            password: "",

        }
    }

    save(values) {
        let instructor = {
            userName: values.userName,
            name: values.name
        }
        UserService.save(instructor).then(() => {
            this.props.setMsg("Added New User Successfully", "success")
            this.props.history.push('/')
        })
    }

    render() {
        let { id, userName, password } = this.state
        return (
            <div>
                <h2>Add New User</h2>
                <div className="container">
                    <Formik
                        initialValues={{ id, userName, password }}
                        onSubmit={this.save}
                        enableReinitialize={true}
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
                                        <label>Password</label>
                                        <Field type="password" name="password" className="form-control" />
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


export default connect(null, { setMsg })(UserComponent)
