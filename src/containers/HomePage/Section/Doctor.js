import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Doctor.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class Doctor extends Component {

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
                <div className='seation-doctor'>
                    <div className='doctor-container'>
                        <div className='doctor-header'>
                            <h2 className='doctor-title'>Bác sĩ nổi bật</h2>
                            <button className='doctor-btn'>TÌM KIẾM</button>
                        </div>
                        <div className='doctor-body'>
                            <Slider {...settings}>
                                <div className='img-customize'>
                                    <div className='doctor-body-info'>
                                        <div className='doctor-thumb'/>
                                        <div className="doctor-info">
                                            <div className='doctor-name'>GS-TS Hoàng Văn Thiên</div>
                                            <div className='doctor-speciality'>Thần Kinh</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='doctor-body-info'>
                                        <div className='doctor-thumb'/>
                                        <div className="doctor-info">
                                            <div className='doctor-name'>GS-TS Hoàng Văn Thiên</div>
                                            <div className='doctor-speciality'>Thần Kinh</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='doctor-body-info'>
                                        <div className='doctor-thumb'/>
                                        <div className="doctor-info">
                                            <div className='doctor-name'>GS-TS Hoàng Văn Thiên</div>
                                            <div className='doctor-speciality'>Thần Kinh</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='doctor-body-info'>
                                        <div className='doctor-thumb'/>
                                        <div className="doctor-info">
                                            <div className='doctor-name'>GS-TS Hoàng Văn Thiên</div>
                                            <div className='doctor-speciality'>Thần Kinh</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='doctor-body-info'>
                                        <div className='doctor-thumb'/>
                                        <div className="doctor-info">
                                            <div className='doctor-name'>GS-TS Hoàng Văn Thiên</div>
                                            <div className='doctor-speciality'>Thần Kinh</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='doctor-body-info'>
                                        <div className='doctor-thumb'/>
                                        <div className="doctor-info">
                                            <div className='doctor-name'>GS-TS Hoàng Văn Thiên</div>
                                            <div className='doctor-speciality'>Thần Kinh</div>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
