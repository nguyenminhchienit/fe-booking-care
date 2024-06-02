import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListSpecialty.scss";
import {
  getAllClinicService,
  getAllSpecialtyService,
} from "../../../services/userService";

class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyArr: [],
    };
  }

  async componentDidMount() {
    this.getAllSpecialty();
  }

  getAllSpecialty = async () => {
    const res = await getAllSpecialtyService();
    if (res.errCode === 0 && res.data) {
      this.setState({
        specialtyArr: res.data,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="user-container container">
          <div className="title mb-5">Danh sách chuyên khoa</div>
          <div className="user-table mt-3">
            <table id="table-manage">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>

                {this.state.specialtyArr &&
                  this.state.specialtyArr.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          <img className="img-size" src={item.image} alt="" />
                        </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
