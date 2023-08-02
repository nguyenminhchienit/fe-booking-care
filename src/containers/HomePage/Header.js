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
