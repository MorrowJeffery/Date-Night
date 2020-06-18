import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, updatePW } from "../../actions/authActions";
import './settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
        setPassword: false,
        currentPW: "",
        newPW: "",
        confirmNewPW: "",
        errors: "",
        success: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit () {
    if (this.state.currentPW && this.state.newPW && this.state.confirmNewPW) {
        if (this.state.newPW !== this.state.confirmNewPW) {
            this.setState({ errors: "New passwords must match" })
        }
        else {
            this.props.updatePW(this.props.auth.user.id, this.state.newPW, this.state.currentPW);
            this.setState({ success: "Password changed successfully" });
            this.setState({ changePassword: false });
            this.setState({ errors: "" })
        }
    }
    else {
        this.setState({ errors: "All fields required" })
    }
  };

  render() {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div>
                        {this.props.auth.updateErrors.success ? (<p className="green"> {this.state.success} </p>)
                        :
                        (<p></p>)
                        }
                        {this.props.auth.updateErrors.error && !this.props.auth.updateErrors.success ? (<p className="red"> {this.props.auth.updateErrors.error} </p>)
                        :
                        (<p></p>)
                        }
                        <p className="red"> {this.state.errors} </p>

                        <button className="changepwbtn" onClick={ () => {this.setState({ changePassword: true })}}>Change Password</button>
                        {this.state.changePassword ? ( 
                            <div>
                                <form>
                                    <div className="form-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.currentPW}
                                            id="currentPW"
                                            type="password"
                                        />
                                        <label htmlFor="currentPW">Current Password</label>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newPW}
                                            id="newPW"
                                            type="password"
                                        />
                                        <label htmlFor="newPW">New Password</label>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.confirmNewPW}
                                            id="confirmNewPW"
                                            type="password"
                                        />
                                        <label htmlFor="confirmNewPW">Confirm New Password</label>
                                    </div>
                                    <h3 className="btn loginbtn changepwbtn" onClick={ () => {this.onSubmit()}}>Submit</h3>
                                </form>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, updatePW }
)(withRouter(Settings));
