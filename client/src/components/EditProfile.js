import React, { Component } from "react";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../actions/profileActions";
import { withRouter } from "react-router-dom";
import isEmpty from "../utils/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCSV = profile.skills.join(",");
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };
    this.props.createProfile(profileData, this.props.history);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-twitter" />
              </span>
            </div>
            <input
              type="text"
              placeholder="Twitter URL"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.twitter
              })}
              name="twitter"
              value={this.state.twitter}
              onChange={this.handleChange}
            />
            {errors.twitter && (
              <div className="invalid-feedback">{errors.twitter}</div>
            )}
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-facebook" />
              </span>
            </div>
            <input
              type="text"
              placeholder="Facebook URL"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.facebook
              })}
              name="facebook"
              value={this.state.facebook}
              onChange={this.handleChange}
            />
            {errors.facebook && (
              <div className="invalid-feedback">{errors.facebook}</div>
            )}
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-youtube" />
              </span>
            </div>
            <input
              type="text"
              placeholder="Youtube URL"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.youtube
              })}
              name="youtube"
              value={this.state.youtube}
              onChange={this.handleChange}
            />
            {errors.youtube && (
              <div className="invalid-feedback">{errors.youtube}</div>
            )}
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-linkedin" />
              </span>
            </div>
            <input
              type="text"
              placeholder="LinkedIn URL"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.linkedin
              })}
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.handleChange}
            />
            {errors.linkedin && (
              <div className="invalid-feedback">{errors.linkedin}</div>
            )}
          </div>
        </div>
      );
    }
    const options = [
      { label: "Select professional status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Intern", value: "Intern" }
    ];
    const selectOptions = options.map(option => (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    ));
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.handle
                    })}
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.handleChange}
                  />
                  {errors.handle && (
                    <div className="invalid-feedback">{errors.handle}</div>
                  )}
                  <small className="form-text text-muted">
                    A unique handle for your profile
                  </small>
                </div>
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.status
                    })}
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    {selectOptions}
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.company
                    })}
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.handleChange}
                  />
                  {errors.company && (
                    <div className="invalid-feedback">{errors.company}</div>
                  )}
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.website
                    })}
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.handleChange}
                  />
                  {errors.website && (
                    <div className="invalid-feedback">{errors.website}</div>
                  )}
                  <small className="form-text text-muted">
                    Your or your company website
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.location
                    })}
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                  <small className="form-text text-muted">
                    City or whatever
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.skills
                    })}
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.handleChange}
                  />
                  {errors.skills && (
                    <div className="invalid-feedback">{errors.skills}</div>
                  )}
                  <small className="form-text text-muted">
                    Please use comma seperated values
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.githubusername
                    })}
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.handleChange}
                  />
                  {errors.githubusername && (
                    <div className="invalid-feedback">
                      {errors.githubusername}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.bio
                    })}
                    placeholder="* Profile bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handleChange}
                  />
                  {errors.bio && (
                    <div className="invalid-feedback">{errors.bio}</div>
                  )}
                  <small className="form-text text-muted">
                    Tell us about yourself
                  </small>
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn-light btn"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Media Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
