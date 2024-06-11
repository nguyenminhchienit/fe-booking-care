import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../../store/actions";
import _ from "lodash";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../../utils";
import ToaThuoc from "../../../System/TT/ToaThuoc";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSubmitModal = () => {
    const data = {
      email: this.state.email,
      imgBase64: this.state.message,
    };

    this.props.sendRemedy(data);
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
                <span className="remedy-modal-title">Tạo toa thuốc</span>
                <i
                  class="fas fa-times close-modal"
                  onClick={() => handleHideModal()}
                ></i>
              </div>
              <div className="remedy-modal-body ">
                <div className="form-doctor row p-3">
                  <ToaThuoc />
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
