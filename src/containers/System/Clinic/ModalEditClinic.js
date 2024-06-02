import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import "../ModalUser.scss";
import _ from "lodash";

class ModalEditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
    };
  }

  componentDidMount() {
    let clinic = this.props.currentClinic;
    if (clinic && !_.isEmpty(clinic)) {
      this.setState({
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleChangeInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrType = ["name", "address"];

    for (let i = 0; i < arrType.length; i++) {
      if (!this.state[arrType[i]]) {
        isValid = false;
        alert("Missing params");
        break;
      }
    }
    return isValid;
  };

  handleSaveClinic = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editClinic(this.state);
    }
    // this.toggle();
  };

  render() {
    return (
      <div className="modal-container">
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className="modal-container-user"
          size="md"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>Update clinic</ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container full-with-input">
                <label>Name clinic</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.handleChangeInput(e, "name")}
                ></input>
              </div>
            </div>
            <div className="modal-user-body">
              <div className="input-container full-with-input">
                <label>Address</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.handleChangeInput(e, "address")}
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveClinic()}
            >
              Save changes
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditClinic);
