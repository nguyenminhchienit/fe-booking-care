import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [4,5]
        }
    }

    async componentDidMount() {
        
    }

    render() {
        
        return (
            <React.Fragment>
                <Header/>
                <div className='specialty-detail-container'>
                    <div className="specialty-desc"> 

                    </div>
                    {this.state.arrDoctorId && this.state.arrDoctorId.length > 0 &&
                    this.state.arrDoctorId.map((item,index) => {
                        return (
                            <div className='each-doctor' key={index}>
                                <div className='content-left-item'>
                                    <ProfileDoctor doctorId={item}/>
                                </div>
                                <div className='content-right-item'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule
                                            doctorIdFromParent = {item}
                                        />
                                    </div>
                                    <div className='doctor-extra-info'>
                                        <DoctorExtraInfo
                                            doctorIdFromParent = {item}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
