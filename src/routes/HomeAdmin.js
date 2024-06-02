import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import "./HomeAdmin.scss";
import {
  getAllDoctorService,
  getAllUsers,
  getAllBookingService,
  getAllClinicService,
} from "../services/userService";
import Chart from "../containers/Chart/Chart";

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-admin-wrapper title mt-5">
        <div>Xin chào bạn đến với TakisCare</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    allDoctorRedux: state.admin.allDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
