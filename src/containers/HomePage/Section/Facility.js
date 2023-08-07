import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Facility.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class Facility extends Component {

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
                                <div className='img-customize'>
                                    <div className='facility-body'>
                                        <div className='facility-thumb'/>
                                        <h3 className='sub-title-facility'>Cơ sở 1</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='facility-body'>
                                        <div className='facility-thumb'/>
                                        <h3 className='sub-title-facility'>Cơ sở 2</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='facility-body'>
                                        <div className='facility-thumb'/>
                                        <h3 className='sub-title-facility'>Cơ sở 3</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='facility-body'>
                                        <div className='facility-thumb'/>
                                        <h3 className='sub-title-facility'>Cơ sở 4</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='facility-body'>
                                        <div className='facility-thumb'/>
                                        <h3 className='sub-title-facility'>Cơ sở 5</h3>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='facility-body'>
                                        <div className='facility-thumb'/>
                                        <h3 className='sub-title-facility'>Cơ sở 6</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
