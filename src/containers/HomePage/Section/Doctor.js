import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import './Doctor.scss'
import * as actions from '../../../store/actions'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class Doctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorArr: []
        }
    }

    componentDidMount(){
        this.props.fetchDoctorStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.doctorRedux !== this.props.doctorRedux){
            this.setState({
                doctorArr: this.props.doctorRedux
            })
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
        //   console.log("Check doctor redux: ",this.state.doctorArr)
        //   console.log("Check lang: ",LANGUAGES.VI === this.props.lang)
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
                                {this.state.doctorArr && this.state.doctorArr.length > 0 && 
                                    this.state.doctorArr.map((item,index) => {
                                        let imageBase64 = '';
                                        if(item.image){
                                            imageBase64 = new Buffer (item.image, 'base64').toString('binary')
                                        }
                                        let nameVI = `${item.positionData.valueVI}, ${item.firstName} ${item.lastName}`
                                        let nameEN = `${item.positionData.valueEN}, ${item.lastName} ${item.firstName}`

                                        return (
                                            <div className='img-customize' key={index}>
                                                <div className='doctor-body-info'>
                                                    <div className='doctor-thumb' style={{backgroundImage: `url(${imageBase64})`}}/>
                                                    <div className="doctor-info">
                                                        <div className='doctor-name'>{this.props.lang === LANGUAGES.VI ? nameVI : nameEN}</div>
                                                        <div className='doctor-speciality'>Thần Kinh</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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
        lang: state.app.language,
        doctorRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorStart: () => dispatch(actions.fetchDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
