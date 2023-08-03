import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HandBook.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class HandBook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
          };
        return (
            <React.Fragment>
                <div className='seation-handbook'>
                    <div className='handbook-container'>
                        <div className='handbook-header'>
                            <h2 className='handbook-title'>Cẩm nang</h2>
                            <button className='handbook-btn'>XEM THÊM</button>
                        </div>
                        <div className='handbook-body'>
                            <Slider {...settings}>
                                <div className='img-customize'>
                                    <div className='handbook-body-info'>
                                        <div className='handbook-thumb'/>                  
                                        <div className='handbook-title-info'>Giải đáp Y học: Tiểu đường tuýp 2 là nặng hay nhẹ?</div>
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='handbook-body-info'>
                                        <div className='handbook-thumb'/>
                                        <div className='handbook-title-info'>Giải đáp Y học: Tiểu đường tuýp 2 là nặng hay nhẹ?</div>
                                        
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='handbook-body-info'>
                                        <div className='handbook-thumb'/>
                                        <div className='handbook-title-info'>Giải đáp Y học: Tiểu đường tuýp 2 là nặng hay nhẹ?</div>
                                        
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='handbook-body-info'>
                                        <div className='handbook-thumb'/>
                                        <div className='handbook-title-info'>Giải đáp Y học: Tiểu đường tuýp 2 là nặng hay nhẹ?</div>
                                        
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='handbook-body-info'>
                                        <div className='handbook-thumb'/>
                                        <div className='handbook-title-info'>Giải đáp Y học: Tiểu đường tuýp 2 là nặng hay nhẹ?</div>
                                        
                                    </div>
                                </div>
                                <div className='img-customize'>
                                    <div className='handbook-body-info'>
                                        <div className='handbook-thumb'/>
                                        <div className='handbook-title-info'>Giải đáp Y học: Tiểu đường tuýp 2 là nặng hay nhẹ?</div>
                                        
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
