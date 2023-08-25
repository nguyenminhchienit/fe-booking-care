import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Facility.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getAllClinicService} from '../../../services/userService'
import { withRouter } from 'react-router-dom';

class Facility extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService()
        if(res && res.errCode === 0){
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        // console.log(clinic.id)
        // alert("63272")
        //Chuyen huong vao trang deatil-doctor ( nho import thu vien withRoute va boc het component)
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };
        return (
            <React.Fragment>
                <div className='seation-facility'>
                    <div className='facility-container'>
                        <div className='facility-header'>
                            <h2 className='facility-title'><FormattedMessage id="homepage.health-facilities"/></h2>
                            <button className='facility-btn'><FormattedMessage id="homepage.more"/></button>
                        </div>
                        <div className='facility-body'>
                            <Slider {...settings}>
                            {this.state.dataClinic && this.state.dataClinic.length > 0 &&
                                    this.state.dataClinic.map(item => {
                                        return (
                                            <div className='img-customize-demo' key={item.index} >
                                                <div className='facility-body' onClick={() => this.handleViewDetailClinic(item)}>
                                                    <div 
                                                        className='facility-thumb'
                                                        style={{backgroundImage: `url(${item.image})`}}
                                                    />
                                                    <h3 className='sub-title-facility'>{item.name}</h3>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Facility));
