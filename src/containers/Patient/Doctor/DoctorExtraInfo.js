import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'


class DoctorExtraInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShowPopup: true
        }
    }

    componentDidMount(){
        
    }

    

   
    async componentDidUpdate(prevProps,prevState, snapshot){
       
    }

    handleShowHidePrice = (value) => {
        this.setState({
            isShowPopup: value
        })
    }
   
    render() {
        return (
            <React.Fragment>
               <div className='doctor-extra-container'>
                    <div className='doctor-extra-up'>
                        <div className='address-title'>
                            ĐỊA CHỈ KHÁM
                        </div>
                        <div className='clinic-name'>
                            Phòng khám Bệnh viện Đại học Y Dược 1
                        </div>
                        <div className='address-name'>
                            20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM
                        </div>
                    </div>
                    <div className='doctor-extra-down'>
                        {this.state.isShowPopup === true ? 
                            <>
                                <span className='price-name'>
                                    GIÁ KHÁM: 
                                </span>
                                <span className='price'>250.000đ - 500.000đ</span>
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
                                        <span className='price-more'>250.000đ - 500.000đ</span>
                                    </div>
                                    <div className='more-desc'>
                                        Giá tư vấn 15 phút: 250.000vnđ <br/>
                                        Giá tư vấn 30 phút: 500.000vnđ
                                    </div>
                                </div>
                                <div className='payment'>
                                    Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
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
