import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../../store/actions";
import _ from "lodash";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
      message: "",
      trieuchung: "",
      loidan: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal.patientId) {
      this.setState({
        email: this.props.dataModal.patientData.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.patientData.email,
      });
    }
  }

  handleChangeInput = (e, id) => {
    let valueInput = e.target.value;
    let copyState = { ...this.state };
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };

  handleSubmitModal = () => {
    const data =
      this.props.extra === true
        ? {
            email: this.state.email,
            imgBase64: this.state.message,
          }
        : {
            email: this.state.email,
            imgBase64: this.state.imgBase64,
            trieuchung: this.state.trieuchung,
            loidan: this.state.loidan,
          };
    // this.props.sendRemedy(this.state);
    this.props.sendRemedy(data);
  };

  handleChangeImg = async (e) => {
    let file = e.target.files;
    let fileImg = file[0];
    if (fileImg) {
      let base64 = await CommonUtils.getBase64(fileImg);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  render() {
    let { handleHideModal, isOpenModal, extra } = this.props;
    return (
      <React.Fragment>
        <div className="remedy-modal-container">
          <Modal
            isOpen={isOpenModal}
            className={"remedy-modal-wrapper"}
            size="md"
            centered
          >
            <div className="remedy-modal-content">
              <div className="remedy-modal-header">
                <span className="remedy-modal-title">
                  {extra === false
                    ? "Thông tin toa thuốc"
                    : "Thông tin nhắc lịch khám"}
                </span>
                <i
                  class="fas fa-times close-modal"
                  onClick={() => handleHideModal()}
                ></i>
              </div>
              <div className="remedy-modal-body ">
                <div className="form-doctor row p-3">
                  <div className="col-6 form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) => this.handleChangeInput(e, "email")}
                    ></input>
                  </div>
                  <div className="col-6 form-group">
                    <label>{extra === true ? "Lời nhắn" : "Toa thuốc"}</label>
                    {extra === true ? (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.message}
                        onChange={(e) => this.handleChangeInput(e, "message")}
                      ></input>
                    ) : (
                      <input
                        type="file"
                        className="form-control-file"
                        accept="image/*"
                        onChange={(e) => this.handleChangeImg(e)}
                      ></input>
                    )}
                  </div>

                  {!extra && (
                    <div className="col-12 form-group">
                      <label>Triệu chứng / Chuẩn đoán</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.trieuchung}
                        onChange={(e) =>
                          this.handleChangeInput(e, "trieuchung")
                        }
                      ></input>
                    </div>
                  )}

                  {!extra && (
                    <div className="col-12 form-group">
                      <label>Lời dặn</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.loidan}
                        onChange={(e) => this.handleChangeInput(e, "loidan")}
                      ></input>
                    </div>
                  )}
                </div>
              </div>
              <div className="remedy-modal-footer">
                <button
                  className="btn-submit btn"
                  onClick={() => this.handleSubmitModal()}
                >
                  Xác nhận
                </button>
                <button
                  className="btn-close btn"
                  onClick={() => handleHideModal()}
                >
                  Hủy
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
