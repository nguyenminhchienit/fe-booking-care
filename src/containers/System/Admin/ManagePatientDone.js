import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { LANGUAGES } from "../../../utils";

import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import {
  getListPatientForDoctorDoneService,
  postSendRemedyDoneService,
} from "../../../services/userService";
import RemedyModal from "../../Patient/Doctor/Modal/RemedyModal";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

class ManagePatientDone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatientDone: [],
      isLoading: false,
      isOpenModal: false,
      dataModal: {},
    };
  }

  async componentDidMount() {
    let res = await getListPatientForDoctorDoneService({
      date: new Date(this.state.currentDate).getTime(),
      doctorId: this.props.user.id,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatientDone: res.data,
      });
    }
  }

  getPreviousDay = (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  };

  onChangePickerDate = async (date) => {
    let res = await getListPatientForDoctorDoneService({
      date: new Date(date[0]).getTime(),
      doctorId: this.props.user.id,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatientDone: res.data,
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

  sendRemedy = async (dataFromModal) => {
    console.log("Check send remedy: ", dataFromModal);
    this.setState({
      isLoading: true,
    });
    let res = await postSendRemedyDoneService({
      email: dataFromModal.email,
      doctorId: this.state.dataModal.doctorId,
      patientId: this.state.dataModal.patientId,
      timeType: this.state.dataModal.timeType,
      language: this.props.lang,
      patientName: this.state.dataModal.patientData.firstName,
      imgBase64: dataFromModal.imgBase64,
    });

    this.setState({
      isLoading: false,
    });

    if (res && res.errCode === 0) {
      toast.success("Xác nhận nhắc lịch bệnh nhân thành công");
      let res = await getListPatientForDoctorDoneService({
        date: new Date(this.state.currentDate).getTime(),
        doctorId: this.props.user.id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataPatient: res.data,
        });
      }
      this.handleHideModal();
    } else {
      toast.error("Xác nhận thất bại");
    }
  };

  render() {
    let { lang } = this.props;
    return (
      <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
        <React.Fragment>
          <div className="manage-patient-container">
            <div className="title mb-3">ManageDoctor Patient Done</div>
            <div className="container">
              <div className="manage-patient-body row p-3">
                <div className="col-6">
                  <label>Chọn ngày</label>
                  <DatePicker
                    onChange={this.onChangePickerDate}
                    className="form-control"
                    value={this.state.currentDate} //currentDate[0]: phan tu thu 0 moi tra ve dung ding dang ngay
                    minDate={this.getPreviousDay()}
                  />
                </div>
                <div className="col-12">
                  <table id="table-manage-patient">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Giới tính</th>
                        <th>Trạng thái</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataPatientDone &&
                        this.state.dataPatientDone.length > 0 &&
                        this.state.dataPatientDone.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                {(lang === LANGUAGES.VI) === true
                                  ? item.timeData.valueVI
                                  : item.timeData.valueEN}
                              </td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.email}</td>
                              <td>
                                {lang === LANGUAGES.VI
                                  ? item.patientData.genderData.valueVI
                                  : item.patientData.genderData.valueEN}
                              </td>
                              <td>
                                <span className="confirm">Đã khám</span>
                              </td>
                              <td>
                                <button
                                  className="confirm-patient"
                                  onClick={() => this.handleShowModal(item)}
                                >
                                  <i class="fas fa-check"></i>
                                  <span className="confirm">
                                    Nhắc lại lịch khám
                                  </span>
                                </button>
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
          <RemedyModal
            isOpenModal={this.state.isOpenModal}
            handleHideModal={this.handleHideModal}
            dataModal={this.state.dataModal}
            sendRemedy={this.sendRemedy}
            extra={true}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatientDone);
