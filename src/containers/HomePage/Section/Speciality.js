import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Speciality.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Speciality extends Component {

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
                <div className='seation-speciality'>
                    <div className='speciality-container'>
                        <div className='speciality-header'>
                            <h2 className='speciality-title'>Chuyên khoa phổ biến</h2>
                            <button className='speciality-btn'>XEM THÊM</button>
                        </div>
                        <div className='speciality-body'>
                            <Slider {...settings}>
                                <div className='img-customize'>
                                    <div className='speciality-body'>
                                        <div className='speciality-thumb'/>
                                        <h3 className='sub-title-speciality'>Chuyên khoa 1</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='speciality-body'>
                                        <div className='speciality-thumb'/>
                                        <h3 className='sub-title-speciality'>Chuyên khoa 2</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='speciality-body'>
                                        <div className='speciality-thumb'/>
                                        <h3 className='sub-title-speciality'>Chuyên khoa 3</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='speciality-body'>
                                        <div className='speciality-thumb'/>
                                        <h3 className='sub-title-speciality'>Chuyên khoa 4</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='speciality-body'>
                                        <div className='speciality-thumb'/>
                                        <h3 className='sub-title-speciality'>Chuyên khoa 5</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='speciality-body'>
                                        <div className='speciality-thumb'/>
                                        <h3 className='sub-title-speciality'>Chuyên khoa 6</h3>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
