import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import {getExtraDoctorInfoService} from '../../../services/userService'

import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';

class DoctorExtraInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShowPopup: true,
            doctorInfo: {}
        }
    }

    componentDidMount(){
        
    }

   
    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
                let res = await getExtraDoctorInfoService(this.props.doctorIdFromParent)
                if(res && res.errCode === 0){
                    this.setState({
                        doctorInfo: res.data
                    })
                }
        }
    }

    handleShowHidePrice = (value) => {
        this.setState({
            isShowPopup: value
        })
    }
   
    render() {
        console.log("Check state: ",this.state)
        return (
            <React.Fragment>
               <div className='doctor-extra-container'>
                    <div className='doctor-extra-up'>
                        <div className='address-title'>
                            ĐỊA CHỈ KHÁM
                        </div>
                        <div className='clinic-name'>
                            {this.state.doctorInfo.nameClinic}
                        </div>
                        <div className='address-name'>
                            {this.state.doctorInfo.addressClinic}
                        </div>
                    </div>
                    <div className='doctor-extra-down'>
                        {this.state.isShowPopup === true ? 
                            <>
                                <span className='price-name'>
                                    GIÁ KHÁM: 
                                </span>
                                <span className='price'>
                                {this.state.doctorInfo && this.state.doctorInfo.priceTypeData && this.props.language === LANGUAGES.VI 
                                   && <NumberFormat 
                                        value={this.state.doctorInfo.priceTypeData.valueVI} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        suffix={' VND'} 
                                    />
                                }
                                {this.state.doctorInfo && this.state.doctorInfo.priceTypeData && this.props.language === LANGUAGES.EN 
                                   && <NumberFormat 
                                        value={this.state.doctorInfo.priceTypeData.valueEN} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        suffix={'$'} 
                                    />
                                }
                                </span>
                                <span 
                                    className='more'
                                    onClick={() => this.handleShowHidePrice(false)}
                                >
                                    Xem chi tiết
                                </span>
                            </> 
                            :
                            <div className='extra-info'>
                                <div className='price-name'>
                                    GIÁ KHÁM:
                                </div>
                                <div className='more-container'>
                                    <div className='detail-price'>
                                        <span className='clinic-price'>Giá khám</span>
                                        <span className='price-more'>
                                            {this.state.doctorInfo && this.state.doctorInfo.priceTypeData && this.props.language === LANGUAGES.VI 
                                                && <NumberFormat 
                                                        value={this.state.doctorInfo.priceTypeData.valueVI} 
                                                        displayType={'text'} 
                                                        thousandSeparator={true} 
                                                        suffix={' VND'} 
                                                    />
                                            }
                                            {this.state.doctorInfo && this.state.doctorInfo.priceTypeData && this.props.language === LANGUAGES.EN 
                                            && <NumberFormat 
                                                    value={this.state.doctorInfo.priceTypeData.valueEN} 
                                                    displayType={'text'} 
                                                    thousandSeparator={true} 
                                                    suffix={'$'} 
                                                />
                                            }
                                        </span>
                                    </div>
                                    <div className='more-desc'>
                                        {this.state.doctorInfo.note}
                                    </div>
                                </div>
                                <div className='payment'>
                                    Phòng khám có thanh toán bằng hình thức: 
                                    <span> {this.state.doctorInfo.paymentTypeData.valueVI}</span>
                                </div>
                                <div className='hide-table' onClick={() => this.handleShowHidePrice(true)}>Ẩn bảng giá</div>
                            </div>
                        }

                       
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
