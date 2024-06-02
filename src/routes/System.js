import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageHandbook from "../containers/System/Handbook/ManageHandbook";
import HomeAdmin from "./HomeAdmin";
import ListClinic from "../containers/System/Clinic/ListClinic";
import ListSpecialty from "../containers/System/Specialty/ListSpecialty";
import ListHandbook from "../containers/System/Handbook/ListHandbook";
import Dashboard from "./Dashboard";
import HistoryBooking from "../containers/Patient/HistoryBooking";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <div className="system-container">
        {isLoggedIn && <Header />}
        <div className="system-list">
          <Switch>
            <Route path="/system/admin" component={HomeAdmin} />
            <Route path="/system/dashboard" component={Dashboard} />

            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/user-redux" component={UserRedux} />
            <Route path="/system/user-doctor" component={ManageDoctor} />
            <Route
              path="/system/manage-history-schedule"
              component={HistoryBooking}
            />

            <Route
              path="/system/speciality-manage"
              component={ManageSpecialty}
            />
            <Route path="/system/clinic-manage" component={ManageClinic} />
            <Route path="/system/handbook-manage" component={ManageHandbook} />
            <Route path="/system/list-clinic-manage" component={ListClinic} />
            <Route
              path="/system/list-speciality-manage"
              component={ListSpecialty}
            />
            <Route
              path="/system/list-handbook-manage"
              component={ListHandbook}
            />

            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
