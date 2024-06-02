import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu, patientMenu } from "./menuApp";
import "./Header.scss";

import { LANGUAGES, USER_ROLE } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    let menu = [];
    if (this.props.userInfo && !_.isEmpty(this.props.userInfo)) {
      if (this.props.userInfo.roleId === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (this.props.userInfo.roleId === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      if (this.props.userInfo.roleId === USER_ROLE.PATIENT) {
        menu = patientMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    const { processLogout } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="action-system">
          <div className="languages">
            <span className="welcome">
              <FormattedMessage id="headerhome.welcome" />
              {this.props.userInfo && this.props.userInfo.lastName
                ? this.props.userInfo.lastName
                : ""}
            </span>
            <span
              className={
                this.props.lang === LANGUAGES.VI
                  ? "language language-vi active"
                  : "language language-vi"
              }
              onClick={() => this.changeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
            <span
              className={
                this.props.lang === LANGUAGES.EN
                  ? "language language-en active"
                  : "language language-en"
              }
              onClick={() => this.changeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>

          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Log out
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
