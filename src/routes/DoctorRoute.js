import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Admin/ManageSchedule';
import ManagePatient from '../containers/System/Admin/ManagePatient';

class DoctorRoute extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <div className="DoctorRoute-container">
                {isLoggedIn && <Header />}
                <div className="DoctorRoute-list">
                    <Switch>
                        <Route path="/doctor/manage-schedule" component={ManageSchedule}></Route>
                        <Route path="/doctor/manage-patient" component={ManagePatient}></Route>

                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorRouteMenuPath: state.app.DoctorRouteMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRoute);
