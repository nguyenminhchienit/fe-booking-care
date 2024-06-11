import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLogin } from "../../services/userService";
import { USER_ROLE } from "../../utils";
import "./Login.scss";
import _ from "lodash";
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInputUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangeInputPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      console.log(data.user.roleId);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data.user && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        //todo
        // if (data.user && !_.isEmpty(data.user)) {
        //   if (data.user.roleId === USER_ROLE.ADMIN) {
        //     this.context.router.history.push("/system/admin");
        //   }
        //   if (data.user.roleId === USER_ROLE.DOCTOR) {
        //     this.context.router.history.push("/doctor/manage-schedule");
        //   }
        //   if (data.user.roleId === USER_ROLE.PATIENT) {
        //     this.context.router.history.push("/patient/manage-schedule");
        //   }
        // }
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group form-wrap">
              <label className="label-login">User name: </label>
              <input
                value={this.state.username}
                type="text"
                className="form-control input-login"
                placeholder="Enter your name... "
                onChange={(e) => this.handleOnChangeInputUserName(e)}
              />
            </div>
            <div className="col-12 form-group form-wrap">
              <label className="label-login">Password: </label>
              <div className="custom-input-password">
                <input
                  value={this.state.password}
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control input-login"
                  placeholder="Enter your password... "
                  onChange={(e) => this.handleOnChangeInputPassword(e)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{
                color: "red",
                fontSize: "16px",
                marginTop: "-35px",
                marginLeft: "10px",
              }}
            >
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-log"
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-pass">Forgot your password?</span>
            </div>
            {/* <div className="col-12">
              <span className="login-with">Login with</span>
            </div> */}
            {/* <div className="col-12 social-login">
              <i className="fab fa-google icon-gg"></i>
              <i className="fab fa-facebook icon-fb"></i>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
