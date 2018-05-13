import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../actions/postActions";
import classnames from "classnames";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const commentData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, commentData);
    this.setState({ text: "" });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.text
                  })}
                  placeholder="Reply to Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                />
                {errors.text && (
                  <div className="invalid-feedback">{errors.text}</div>
                )}
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
