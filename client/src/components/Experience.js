import React, { Component } from "react";
import { connect } from "react-redux";

import Moment from "react-moment";
import { deleteExperience } from "../actions/profileActions";

class Experience extends Component {
  deleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience
      ? this.props.experience.map((exp) => (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format="YYY/MM/DD">{exp.from}</Moment> -{" "}
              {exp.to === null ? (
                "Now"
              ) : (
                <Moment format="YYY/MM/DD">{exp.to}</Moment>
              )}
            </td>
            <td>
              <button
                onClick={this.deleteClick.bind(this, exp._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      : [];
    return (
      <div>
        <h1 className="mb-4">Experience Credentials</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, { deleteExperience })(Experience);
