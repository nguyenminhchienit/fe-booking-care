import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import {getProfileDoctorByIdService} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import { Link } from "react-router-dom";

import NumberFormat from 'react-number-format';


class ProfileDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            doctorProfile: {}
        }
    }

    async componentDidMount(){
        console.log("Check props from spe: ",this.props.doctorId)
        let res = await getProfileDoctorByIdService(this.props.doctorId)
        if(res && res.errCode === 0){
            this.setState({
                doctorProfile: res.data
            })
        }
    }

   
    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.doctorId !== prevProps.doctorId){
            let res = await getProfileDoctorByIdService(this.props.doctorId)
            if(res && res.errCode === 0){
                this.setState({
                    doctorProfile: res.data
                })
            }
        }
    }

   
    render() {
        console.log("Check profile doc: ",this.state.doctorProfile)
        let nameVI,nameEN;
        if(this.state.doctorProfile && this.state.doctorProfile.positionData){
            nameVI = `${this.state.doctorProfile.positionData.valueVI}, ${this.state.doctorProfile.firstName} ${this.state.doctorProfile.lastName}`
            nameEN = `${this.state.doctorProfile.positionData.valueEN}, ${this.state.doctorProfile.lastName} ${this.state.doctorProfile.firstName}`
        }
        return (
            <React.Fragment>
                <div className='profile-wrapper'>
                    <div className='profile-doctor-container'>
                    <div className='doctor-info'>
                                <div className='content-left'>
                                    <div 
                                        className='img-doctor'
                                        style={{backgroundImage: `url(${this.state.doctorProfile.image ? this.state.doctorProfile.image : '' })`}}
                                    ></div>
                                </div>
                                <div className='content-right'>
                                    <div className='doctor-name'>
                                        {this.props.language === LANGUAGES.VI ? nameVI : nameEN}
                                    </div>
                                    {this.state.doctorProfile && this.state.doctorProfile.Markdown && this.state.doctorProfile.Markdown.description
                                        && <p className='doctor-desc'>{this.state.doctorProfile.Markdown.description}</p>
                                    }
                                </div>
                                
                                <div className='detail-price'>
                                                <div className='clinic-price'>Giá khám</div>
                                                <span className='price-more'>
                                                    {this.state.doctorProfile && this.state.doctorProfile.DoctorInfo && this.state.doctorProfile.DoctorInfo.priceTypeData && this.props.language === LANGUAGES.VI 
                                                        && <NumberFormat 
                                                                value={this.state.doctorProfile.DoctorInfo.priceTypeData.valueVI} 
                                                                displayType={'text'} 
                                                                thousandSeparator={true} 
                                                                suffix={' VND'} 
                                                            />
                                                    }
                                                    {this.state.doctorProfile && this.state.doctorProfile.DoctorInfo && this.state.doctorProfile.DoctorInfo.priceTypeData && this.props.language === LANGUAGES.EN 
                                                    && <NumberFormat 
                                                            value={this.state.doctorProfile.DoctorInfo.priceTypeData.valueEN} 
                                                            displayType={'text'} 
                                                            thousandSeparator={true} 
                                                            suffix={'$'} 
                                                        />
                                                    }
                                                </span>
                                </div>
                            </div>
                    </div>
                    {this.props.isMoreInfo === true && 
                        <div className='link-to-profile'>
                            <Link to={`/detail-doctor/${this.props.doctorId}`}>Xem thêm</Link>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
