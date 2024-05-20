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
    this.state = {
      allDoctors: [],
      allUsers: [],
      allBookings: [],
      allClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllDoctorService();
    if (res && res.errCode === 0) {
      this.setState({
        allDoctors: res.data ? res.data : [],
      });
    }
    let res1 = await getAllUsers("ALL");
    if (res1 && res1.errCode === 0) {
      this.setState({
        allUsers: res1.users ? res1.users : [],
      });
    }

    let res2 = await getAllBookingService();
    if (res2 && res2.errCode === 0) {
      this.setState({
        allBookings: res2.data ? res2.data : [],
      });
    }

    let res3 = await getAllClinicService();
    if (res3 && res3.errCode === 0) {
      this.setState({
        allClinics: res3.data ? res3.data : [],
      });
    }
  }

  render() {
    return (
      <div className="home-admin-wrapper title mt-5">
        <div>Xin chào bạn đến với trang quản lý TakisCare</div>

        <div className="container">
          <div class="gradient-cards">
            <div class="card">
              <div class="container-card bg-green-box">
                <p class="card-count">{this.state.allBookings.length}</p>
                <p class="card-description">Bookings</p>
              </div>
            </div>

            <div class="card">
              <div class="container-card bg-white-box">
                <p class="card-count">{this.state.allUsers.length}</p>
                <p class="card-description">Users</p>
              </div>
            </div>

            <div class="card">
              <div class="container-card bg-yellow-box">
                <p class="card-count">{this.state.allClinics.length}</p>
                <p class="card-description">Clinic</p>
              </div>
            </div>

            <div class="card">
              <div class="container-card bg-blue-box">
                <p class="card-count">{this.state.allDoctors.length}</p>
                <p class="card-description">Doctor</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Chart />
        </div>
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
