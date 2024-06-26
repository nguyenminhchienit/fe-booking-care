import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";

import {
  getBookingWithDayService,
  getScheduleDoctorService,
} from "../../../services/userService";

import { LANGUAGES } from "../../../utils";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allTimes: [],
      isOpenModal: false,
      dateTimeSelect: {},
      timeBooked: [],
      timeAfter: [],
      timeDone: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;

    if (this.props.doctorIdFromParent) {
      let arrDate = this.getArrDayLanguage(this.props.language);
      if (arrDate && arrDate.length > 0) {
        let res = await getScheduleDoctorService(
          arrDate[0].value,
          this.props.doctorIdFromParent
        );
        this.setState({
          allTimes: res.data,
        });
        const result = await getBookingWithDayService(res.data[0]?.date);
        if (result.errCode === 0 && result) {
          this.setState({
            timeBooked: result.data,
          });
        }
      }
    }

    let arrDate = this.getArrDayLanguage(language);
    // console.log("check arr date: ",arrDate)
    this.setState({
      allDays: arrDate,
    });

    this.buildTimeType();
    var resolve =
      this.state.timeAfter.length > 0
        ? this.state.timeAfter
        : this.state.allTimes;
    this.setState({
      timeDone: resolve,
    });
  }

  getArrDayLanguage = (language) => {
    console.log(moment(new Date()).format("dddd - DD/MM"));
    console.log(moment(new Date()).locale("en").format("ddd - DD/MM"));

    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (LANGUAGES.VI === language) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      arrDate.push(obj);
    }
    return arrDate;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let arrDate = this.getArrDayLanguage(this.props.language);
      this.setState({
        allDays: arrDate,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let arrDate = this.getArrDayLanguage(this.props.language);
      if (arrDate && arrDate.length > 0) {
        let res = await getScheduleDoctorService(
          arrDate[0].value,
          this.props.doctorIdFromParent
        );
        this.setState({
          allTimes: res.data,
        });
      }
    }
  }

  handleChangeSelect = async (e) => {
    const result = await getBookingWithDayService(e.target.value);
    if (result.errCode === 0 && result) {
      this.setState({
        timeBooked: result.data,
      });
    }
    let res;
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      res = await getScheduleDoctorService(
        e.target.value,
        this.props.doctorIdFromParent
      );
      this.setState({
        allTimes: res.data ? res.data : [],
      });
    }
    this.buildTimeType();
    var resolve =
      this.state.timeAfter.length > 0
        ? this.state.timeAfter
        : this.state.allTimes;
    this.setState({
      timeDone: resolve,
    });
  };

  //Tim ra cac thoi gian chua dat lich
  buildTimeType = async () => {
    var result = this.state.allTimes
      .filter(
        (obj1) =>
          !this.state.timeBooked.some((obj2) => obj1.timeType === obj2.timeType)
      )
      .concat(
        this.state.timeBooked.filter(
          (obj2) =>
            !this.state.allTimes.some((obj1) => obj2.timeType === obj1.timeType)
        )
      );
    this.setState({
      timeAfter: result,
    });
  };

  handleShowModal = (time) => {
    this.setState({
      isOpenModal: true,
      dateTimeSelect: time,
    });
  };

  handleHideModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="doctor-schedule-container">
          <div className="allDays">
            <select onChange={(e) => this.handleChangeSelect(e)}>
              {this.state.allDays &&
                this.state.allDays.length > 0 &&
                this.state.allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="allTimes">
            <div className="text-calendar">
              <i class="fas fa-calendar-alt"></i>
              <span className="text-schedule">Lịch Khám</span>
            </div>
            <div className="schedule-available">
              {this.state.timeDone.length > 0 ? (
                this.state.timeDone.map((item, index) => {
                  let valueSchedule =
                    LANGUAGES.VI === this.props.language
                      ? item.timeTypeData?.valueVI
                      : item.timeTypeData?.valueEN;
                  return (
                    <button
                      className={
                        LANGUAGES.VI === this.props.language
                          ? "btn-schedule"
                          : "btn-schedule en"
                      }
                      key={index}
                      onClick={() => this.handleShowModal(item)}
                    >
                      {valueSchedule}
                    </button>
                  );
                })
              ) : (
                <div className="default-schedule">
                  Lịch khám cho ngày này chưa có.
                </div>
              )}
            </div>
            <div
              className={
                this.state.allTimes && this.state.allTimes.length > 0
                  ? "hasMore"
                  : "moreDisable"
              }
            >
              <span className="more-text">Chọn </span>
              <i class="fas fa-hand-point-up"></i>
              <span className="more-text"> và đặt miễn phí</span>
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModal={this.state.isOpenModal}
          handleHideModal={this.handleHideModal}
          dateTime={this.state.dateTimeSelect}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
