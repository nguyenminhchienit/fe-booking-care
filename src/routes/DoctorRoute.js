import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Admin/ManageSchedule';

class DoctorRoute extends Component {
    render() {
        return (
            <div className="DoctorRoute-container">
                {this.props.isLoggedIn && <Header />}
                <div className="DoctorRoute-list">
                    <Switch>
                        <Route path="/doctor/manage-schedule" component={ManageSchedule}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorRouteMenuPath: state.app.DoctorRouteMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRoute);
