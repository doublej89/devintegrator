import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../actions/profileActions";
import Spinner from "./Spinner";
import ProfileActionButtons from "./ProfileActionButtons";
import Experience from "./Experience";
import Education from "./Education";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContents;

    if (profile === null || loading) {
      dashboardContents = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContents = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActionButtons />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDelete.bind(this)}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        dashboardContents = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
