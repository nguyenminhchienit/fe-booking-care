import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'

class Header extends Component {

    render() {
        return (
            <div className='header-home-container'>
                <div className='header-home-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars icon-bars-header"></i>
                        <div className='logo-header'>
                        </div>
                    </div>
                    <div className='center-content'>
                        <ul className='list-nav'>
                            <li className='item-nav'>
                                <span className='sub-item-nav'>Chuyên Khoa</span>
                                <span className='des-item-nav'>Tìm bác sĩ theo chuyên khoa</span>
                            </li>
                            <li className='item-nav'>
                                <span className='sub-item-nav'>Cơ sở y tế</span>
                                <span className='des-item-nav'>Chọn bệnh viện phòng khám</span>
                            </li>
                            <li className='item-nav'>
                                <span className='sub-item-nav'>Bác sĩ</span>
                                <span className='des-item-nav'>Chọn bác sĩ giỏi</span>
                            </li>
                            <li className='item-nav'>
                                <span className='sub-item-nav'>Gói khám</span>
                                <span className='des-item-nav'>Khám sức khỏe tổng quát</span>
                            </li>
                        </ul>
                    </div>
                    <div className='right-content'>
                        <i className="far fa-question-circle icon-header-help"></i>
                        <span className='help-header'>Hỗ trợ</span>
                        <span className='phone-help'>0392845906</span>
                        <span className='help-header'>VN</span>
                        <span className='help-header'>EN</span>
                    </div>
                </div>
                <div className='header-home-banner'>
                    <div className='image-banner'>
                        <div className='banner-up'>
                            <div className='title-banner'>NỀN TẢNG Y TẾ</div>
                            <div className='sub-title'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='main-search'>
                                <i className="fas fa-search icon-search-header"></i>
                                <input type='text' placeholder='Tìm kiếm' className='input-search-header'/>
                            </div>
                        </div>
                        <div className='banner-down'>
                            <div className='option-banner'>
                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-hospital icon-option"></i>
                                    </div>
                                    <span className='option-title'>Khám chuyên khoa</span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-mobile-alt icon-option"></i>
                                    </div>
                                    <span className='option-title'>Khám bệnh từ xa</span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-address-book icon-option"></i>
                                    </div>
                                    <span className='option-title'>Khám bệnh tổng quát</span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-vial icon-option"></i>
                                    </div>
                                    <span className='option-title'>Xét nghiệm y học</span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-users icon-option"></i>
                                    </div>
                                    <span className='option-title'>Sức khỏe tinh thần</span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-hospital icon-option"></i>
                                    </div>
                                    <span className='option-title'>Khám chuyên khoa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
