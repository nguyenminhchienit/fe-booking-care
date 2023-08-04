import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Footer.scss'


class Footer extends Component {

    render() {
       
        return (
            <React.Fragment>
                <div className='footer-wrapper'>
                    <div className='footer-container'>
                        <div className='footer-left'>
                            <div className='footer-logo'></div>
                            <div className='footer-name-company'>Công ty Cổ phần Công nghệ TakisCare</div>
                            <div className='footer-address-company'>
                                <i class="fas fa-map-marker-alt"></i>
                                <span className='address'>
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                                </span>
                            </div>

                        </div>
                        <div className='footer-center'>
                            <ul className='footer-list'>
                                <li className='footer-item'>
                                    Liên hệ hợp tác
                                </li>
                                <li className='footer-item'>
                                    Danh bạ y tế
                                </li>
                                <li className='footer-item'>
                                    Sức khỏe danh nghiệp
                                </li>
                                <li className='footer-item'>
                                    Gói chuyển đổi số doanh nghiệp
                                </li>
                                <li className='footer-item'>
                                    Tuyển dụng
                                </li>
                                <li className='footer-item'>
                                    Câu hỏi thường gặp
                                </li>
                                <li className='footer-item'>
                                    Điều khoản sử dụng
                                </li>
                                <li className='footer-item'>
                                    Chính sách bảo mật
                                </li>
                                <li className='footer-item'>
                                    Quy trình hỗ trợ giải quyết khiếu nại
                                </li>
                                <li className='footer-item'>
                                    Quy chế hoạt động
                                </li>
                            </ul>
                        </div>
                        <div className='footer-right'>
                            <div className='footer-info'>
                                <div className='footer-title'>
                                    Trụ sở tại Hà Nội
                                </div>
                                <div className='footer-sub'>                                  
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                                </div>
                            </div>

                            <div className='footer-info'>
                                <div className='footer-title'>
                                    Văn phòng tại TP Hồ Chí Minh
                                </div>
                                <div className='footer-sub'>                                  
                                    Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                                </div>
                            </div>

                            <div className='footer-info'>
                                <div className='footer-title'>
                                    Hỗ trợ khách hàng
                                </div>
                                <div className='footer-sub'>                                  
                                    support@takiscare.vn (7h - 18h)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='copyright'>
                            © 2023 by TakisCare
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
