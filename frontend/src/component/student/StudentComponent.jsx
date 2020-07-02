import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setMsg } from '../../actions/alertAction'
import SemesterDataService from '../../service/SemesterDataService';

class StudentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            email: "",
            semesterList: [],
            semester: 1
        }
    }


    componentDidMount() {
        SemesterDataService.getSemesterData().then(res => {
            this.setState({
                semesterList: res.data
            })
        })
    }

    render() {
        const { id, name, email, semester, semesterList } = this.state
        console.log(semester)
        return (
            <div>
                <h3>Add New Student</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, name, email, semester }}
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
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="email" name="email" />
                                    </fieldset>
                                    <fieldset>
                                        <label>Instructor</label>
                                        <Field component="select" className="form-control" name="semester">
                                            <option value="0">---</option>
                                            {semesterList.map(i =>
                                                <option key={i.id} value={i.id}>{i.semester}</option>
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
        );
    }
}

StudentComponent.propTypes = {};

export default StudentComponent;
