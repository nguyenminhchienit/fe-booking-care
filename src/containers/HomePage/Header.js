import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router-dom";
import { handleSearch } from "../../services/userService";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      dataSearch: [],
      isShowSearch: false,
    };
    this.wrapperRef = React.createRef();
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  async componentDidMount() {
    let res = await handleSearch("");
    if (res && res.errCode === 0) {
      this.setState({
        dataSearch: res.data,
      });
    }
  }

  handleChangSearch = async (e) => {
    this.setState({
      search: e.target.value,
    });

    let res = await handleSearch(e.target.value);
    console.log("check res header: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSearch: res.data,
      });
    }
  };

  showSearch = (e) => {
    console.log("Check e", e.target);
    this.setState({
      isShowSearch: true,
    });
  };

  CloseSearch = (e) => {
    if (this.wrapperRef && this.wrapperRef.current.contains(e.target)) {
      console.log("Check show hide if");
      this.setState({
        isShowSearch: false,
      });
    }
  };

  handleViewDetailSpecialty = (specialty) => {
    // console.log(specialty.id)
    //Chuyen huong vao trang deatil-doctor ( nho import thu vien withRoute va boc het component)
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialty.id}`);
    }
  };

  toLogin = () => {
    this.props.history.push("/login");
  };

  returnHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    console.log("Check props header: ", this.props.userInfo);
    return (
      <React.Fragment>
        <div className="header-home-container">
          <div className="header-home-content">
            <div className="left-content">
              <i className="fas fa-bars icon-bars-header"></i>
              <div
                className="logo-header"
                onClick={() => this.returnHome()}
              ></div>
            </div>
            <div className="center-content">
              <ul className="list-nav">
                <li className="item-nav">
                  <span className="sub-item-nav">
                    <FormattedMessage id="headerhome.speciality" />
                  </span>
                  <span className="des-item-nav">
                    <FormattedMessage id="headerhome.idspeciality" />
                  </span>
                </li>
                <li className="item-nav">
                  <span className="sub-item-nav">
                    <FormattedMessage id="headerhome.facilities" />
                  </span>
                  <span className="des-item-nav">
                    <FormattedMessage id="headerhome.clinic" />
                  </span>
                </li>
                <li className="item-nav">
                  <span className="sub-item-nav">
                    <FormattedMessage id="headerhome.doctor" />
                  </span>
                  <span className="des-item-nav">
                    <FormattedMessage id="headerhome.chooseDoctor" />
                  </span>
                </li>
                <li className="item-nav">
                  <span className="sub-item-nav">
                    <FormattedMessage id="headerhome.package" />
                  </span>
                  <span className="des-item-nav">
                    <FormattedMessage id="headerhome.help" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="right-content">
              <i className="far fa-question-circle icon-header-help"></i>
              <span className="help-header">
                <FormattedMessage id="headerhome.help" />
              </span>
              <span className="phone-help">0392845906</span>
              <span
                className={
                  this.props.lang === LANGUAGES.VI
                    ? "help-header language-vi active"
                    : "help-header language-vi"
                }
                onClick={() => this.changeLanguage(LANGUAGES.VI)}
              >
                VN
              </span>
              <span
                className={
                  this.props.lang === LANGUAGES.EN
                    ? "help-header language-en active"
                    : "help-header language-en"
                }
                onClick={() => this.changeLanguage(LANGUAGES.EN)}
              >
                EN
              </span>
              {this.props.userInfo ? (
                <span className={"help-header"}>
                  <Link className={"help-header"} target="_blank" to={"/login"}>
                    {this.props.userInfo.lastName
                      ? this.props.userInfo.lastName
                      : this.props.userInfo.firstName}
                  </Link>
                </span>
              ) : (
                <Link className={"help-header"} target="_blank" to={"/login"}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="header-home-banner">
            <div className="image-banner">
              <div className="banner-up">
                <div className="title-banner">
                  <FormattedMessage id="headerhome.medical" />
                </div>
                <div className="sub-title">
                  <FormattedMessage id="headerhome.care" />
                </div>
                <div className="main-search">
                  <i className="fas fa-search icon-search-header"></i>
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo chuyên khoa"
                    className="input-search-header"
                    value={this.state.search}
                    onChange={(e) => this.handleChangSearch(e)}
                    onClick={(e) => this.showSearch(e)}
                  />
                  {this.state.isShowSearch &&
                    this.state.isShowSearch === true && (
                      <div
                        className="when-search"
                        ref={this.wrapperRef}
                        onClick={(e) => this.CloseSearch(e)}
                      >
                        <ul className="list-search">
                          {this.state.dataSearch &&
                          this.state.dataSearch.length > 0 ? (
                            this.state.dataSearch.map((item, index) => {
                              return (
                                <li
                                  className="item-search"
                                  key={index}
                                  onClick={() =>
                                    this.handleViewDetailSpecialty(item)
                                  }
                                >
                                  {item.name}
                                </li>
                              );
                            })
                          ) : (
                            <li
                              className="item-search"
                              style={{ textAlign: "center" }}
                            >
                              Trống
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="banner-down">
                <div className="option-banner">
                  <div className="option-banner-child">
                    <div className="icon-banner">
                      <i className="fas fa-hospital icon-option"></i>
                    </div>
                    <span className="option-title">
                      <FormattedMessage id="headerhome.exam" />
                    </span>
                  </div>

                  <div className="option-banner-child">
                    <div className="icon-banner">
                      <i className="fas fa-mobile-alt icon-option"></i>
                    </div>
                    <span className="option-title">
                      <FormattedMessage id="headerhome.remote" />
                    </span>
                  </div>

                  <div className="option-banner-child">
                    <div className="icon-banner">
                      <i className="fas fa-address-book icon-option"></i>
                    </div>
                    <span className="option-title">
                      <FormattedMessage id="headerhome.physical" />
                    </span>
                  </div>

                  <div className="option-banner-child">
                    <div className="icon-banner">
                      <i className="fas fa-vial icon-option"></i>
                    </div>
                    <span className="option-title">
                      <FormattedMessage id="headerhome.test" />
                    </span>
                  </div>

                  <div className="option-banner-child">
                    <div className="icon-banner">
                      <i className="fas fa-users icon-option"></i>
                    </div>
                    <span className="option-title">
                      <FormattedMessage id="headerhome.health" />
                    </span>
                  </div>

                  <div className="option-banner-child">
                    <div className="icon-banner">
                      <i className="fas fa-hospital icon-option"></i>
                    </div>
                    <span className="option-title">
                      <FormattedMessage id="headerhome.dental" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
