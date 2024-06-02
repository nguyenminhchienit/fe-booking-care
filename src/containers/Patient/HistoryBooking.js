import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES, USER_ROLE } from "../../utils";

import DatePicker from "../../components/Input/DatePicker";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import {
  getBookingUser,
  postSendCancelBookingService,
} from "../../services/userService";

class HistoryBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataBooking: [],
      isLoading: false,
      isOpenModal: false,
      dataModal: {},
    };
  }

  async componentDidMount() {
    let patientId = null;
    if (this.props.user.roleId === USER_ROLE.PATIENT) {
      patientId = this.props.user.id;
    }

    let res = await getBookingUser({
      patientId: patientId,
      date: new Date(this.state.currentDate).getTime(),
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataBooking: res.data,
      });
    }
  }

  getPreviousDay = (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  };

  onChangePickerDate = async (date) => {
    let patientId = null;
    if (this.props.user.roleId === USER_ROLE.PATIENT) {
      patientId = this.props.user.id;
    }

    let res = await getBookingUser({
      patientId: patientId,
      date: new Date(this.state.currentDate).getTime(),
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataBooking: res.data,
      });
    }
    this.setState({
      currentDate: date[0],
    });
  };

  handleHideModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  handleShowModal = (patient) => {
    console.log("Check mail: ", patient);
    this.setState({
      isOpenModal: true,
      dataModal: patient,
    });
  };

  handleCancelBooking = async (data) => {
    let res = await postSendCancelBookingService(data);
    console.log(res);
  };

  render() {
    let { lang } = this.props;
    return (
      <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
        <React.Fragment>
          <div className="manage-patient-container">
            <div className="title mb-3">History Booking</div>
            <div className="container">
              <div className="manage-patient-body row p-3">
                <div className="col-6">
                  <label>Chọn ngày</label>
                  <DatePicker
                    onChange={this.onChangePickerDate}
                    className="form-control"
                    value={this.state.currentDate} //currentDate[0]: phan tu thu 0 moi tra ve dung ding dang ngay
                    //minDate={this.getPreviousDay()}
                  />
                </div>
                <div className="col-12">
                  <table id="table-manage-patient">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Bác sĩ</th>
                        <th>Email</th>
                        <th>Lý do khám</th>
                        <th>Giới tính</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataBooking &&
                        this.state.dataBooking.length > 0 &&
                        this.state.dataBooking.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                {(lang === LANGUAGES.VI) === true
                                  ? item.timeData.valueVI
                                  : item.timeData.valueEN}
                              </td>
                              <td>{item.doctorData.firstName}</td>
                              <td>{item.doctorData.email}</td>
                              <td>{item.reason}</td>
                              <td>
                                {lang === LANGUAGES.VI
                                  ? item.doctorData.genderData.valueVI
                                  : item.doctorData.genderData.valueEN}
                              </td>
                              <td>
                                {item.statusId === "S1" && (
                                  <span className="confirm">Chưa xác nhận</span>
                                )}
                                {item.statusId === "S2" && (
                                  <span className="confirm">Đã xác nhận</span>
                                )}
                                {item.statusId === "S3" && (
                                  <span className="confirm">Đã khám</span>
                                )}
                                {item.statusId === "S4" && (
                                  <span className="confirm">Đã hủy</span>
                                )}
                              </td>
                              <td>
                                {item.statusId === "S1" && (
                                  <span className="btn btn-danger center w-full">
                                    Hủy
                                  </span>
                                )}
                                {item.statusId === "S2" && (
                                  <span
                                    className="btn btn-danger center w-full"
                                    onClick={() =>
                                      this.handleCancelBooking(item)
                                    }
                                  >
                                    Hủy
                                  </span>
                                )}
                                {item.statusId === "S3" && (
                                  <span className="btn btn-success center w-full">
                                    Đã khám
                                  </span>
                                )}
                                {item.statusId === "S4" && (
                                  <span
                                    className="btn btn-danger center w-full disable"
                                    disable
                                  >
                                    Đã hủy
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBooking);
