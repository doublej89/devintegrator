import React, { Component } from "react";
import { connect } from "react-redux";

import Moment from "react-moment";
import { deleteExperience } from "../actions/profileActions";

class Education extends Component {
  deleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.deleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h1 className="mb-4">Education Credentials</h1>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteExperience })(Education);
