import React, { Component } from 'react';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import CourseDataService from '../../service/CourseDataService';
import AssignmentDataService from '../../service/AssignmentDataService';
import moment from "moment"
import { setMsg } from '../../actions/alertAction';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router'
class AssignmentComponent extends Component {
    constructor(props) {
        super(props)
        const due = moment().add(15, 'days').format("YYYY-MM-DD")
        //due.setDate(due.getDate() + 30)
        this.state = {
            id: this.props.match.params.id,
            name: "",
            description: "",
            dueDate: due,//.toLocaleDateString("en-US"),
            selectedFile: null,
            courseid: this.props.match.params.cid,
            coursedesc: "",
        }
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onChangeDate = (jsDate, dateString) => {
        const newDate = moment(dateString).format("YYYY-MM-DD")
        this.setState({
            dueDate: newDate
        })

    }

    // On file upload (click the upload button) 
    save = (event) => {
        const { courseid, selectedFile, id, description, name, dueDate } = this.state
        event.preventDefault()
        // Create an object of formData 
        const formData = new FormData();
        const assignment = {
            id, name, description, dueDate, courseid
        }
        console.log(assignment)
        // Update the formData object 
        formData.append(
            "file",
            selectedFile
        );

        Object.keys(assignment).forEach(key => formData.append(key, assignment[key]));

        // Request made to the backend api 
        // Send formData object 
        AssignmentDataService.save(formData).then(res => {
            setMsg("Assignment added Successfully", "success")
            this.props.history.push(`/course/view/${courseid}`)
        })
    };

    componentDidMount() {
        CourseDataService.getCourse(this.state.courseid).then(res => {
            this.setState({
                coursedesc: res.data.description
            })
        })
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        let { id, name, description, coursedesc, dueDate } = this.state
        id = id === "-1" ? "" : id
        return (
            <div>
                <h3>
                    Create New Assignment for "{coursedesc}"
                </h3>
                <div className="container">

                    <form>
                        <input type="hidden" value={id} name={id} />
                        <fieldset className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={name} onChange={this.onChange} className="form-control" />
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" value={description} onChange={this.onChange} className="form-control" />
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Due Date</label>
                            <DatePickerInput
                                onChange={this.onChangeDate}
                                value={dueDate}
                                className='my-custom-datepicker-component'
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Choose Assignment File</label>
                            <input type="file" name="upload" onChange={this.onFileChange} className="form-control" />
                        </fieldset>
                        <button type="submit" className="btn btn-success" onClick={this.save}>Add Assignment</button>
                    </form>
                </div>
            </div>
        );
    }
}
AssignmentComponent.propTypes = {
    setMsg: PropTypes.func.isRequired,
}

export default connect(null, { setMsg })(withRouter(AssignmentComponent))

