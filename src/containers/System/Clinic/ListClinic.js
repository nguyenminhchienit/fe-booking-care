import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListClinic.scss";
import * as actions from "../../../store/actions";
import {
  deleteClinicService,
  getAllClinicService,
  updateClinicService,
} from "../../../services/userService";
import ModalEditClinic from "./ModalEditClinic";

class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicsArr: [],
      isOpenModalEditClinic: false,
      clinicEdit: {},
    };
  }

  async componentDidMount() {
    this.getAllClinic();
  }

  getAllClinic = async () => {
    const res = await getAllClinicService();
    if (res.errCode === 0 && res.data) {
      this.setState({
        clinicsArr: res.data,
      });
    }
  };

  toggleClinicEditModal = () => {
    this.setState({
      isOpenModalEditClinic: !this.state.isOpenModalEditClinic,
    });
  };

  handleEditClinic = (clinic) => {
    this.setState({
      isOpenModalEditClinic: true,
      clinicEdit: clinic,
    });
  };

  handleUpdateClinic = async (data) => {
    try {
      let response = await updateClinicService(data);
      console.log(data);
      console.log(response);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenModalEditClinic: false,
        });
        this.getAllClinic();
      } else {
        alert(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteClinic = async (clinic) => {
    try {
      let response = await deleteClinicService(clinic.id);
      console.log(response);
      if (response && response.errCode === 0) {
        await this.getAllClinic();
      } else {
        alert(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isOpenModalEditClinic && (
          <ModalEditClinic
            isOpen={this.state.isOpenModalEditClinic}
            toggleFromParent={this.toggleClinicEditModal}
            currentClinic={this.state.clinicEdit}
            editClinic={this.handleUpdateClinic}
          />
        )}
        <div className="user-container container">
          <div className="title mb-5">Danh sách phòng khám</div>
          <div className="user-table mt-3">
            <table id="table-manage">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>

                {this.state.clinicsArr &&
                  this.state.clinicsArr.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="edit-clinic"
                            onClick={() => this.handleEditClinic(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="delete-clinic"
                            onClick={() => this.handleDeleteClinic(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
