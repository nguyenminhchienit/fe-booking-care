import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Speciality from './Section/Speciality';
import Facility from './Section/Facility';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';

class HomePage extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Speciality/>
                <Facility/>
                <Doctor/>
                <HandBook/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
