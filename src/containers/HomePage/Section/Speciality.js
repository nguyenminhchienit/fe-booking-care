import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Speciality.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { withRouter } from 'react-router-dom';

import {getAllSpecialtyService} from '../../../services/userService.js'


class Specialty extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService()
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        console.log(specialty)
        //Chuyen huong vao trang deatil-doctor ( nho import thu vien withRoute va boc het component)
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${specialty.id}`)
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
          console.log("Check state specialty: ",this.state)
        return (
            <React.Fragment>
                <div className='seation-speciality'>
                    <div className='speciality-container'>
                        <div className='speciality-header'>
                            <h2 className='speciality-title'><FormattedMessage id="homepage.popular-specialties"/></h2>
                            <button className='speciality-btn'><FormattedMessage id="homepage.more"/></button>
                        </div>
                        <div className='speciality-body'>
                            <Slider {...settings}>
                                {this.state.dataSpecialty && this.state.dataSpecialty.length > 0 &&
                                    this.state.dataSpecialty.map(item => {
                                        return (
                                            <div className='img-customize' key={item.index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <div className='speciality-body'>
                                                    <div 
                                                        className='speciality-thumb'
                                                        style={{backgroundImage: `url(${item.image})`}}
                                                    />
                                                    <h3 className='sub-title-speciality'>{item.name}</h3>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
