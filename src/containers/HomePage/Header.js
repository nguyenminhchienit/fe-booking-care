import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Header.scss'
import {LANGUAGES} from "../../utils"

import { changeLanguageApp } from '../../store/actions/appActions';

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        console.log("Check props: ",this.props)
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
                                <span className='sub-item-nav'><FormattedMessage id="headerhome.speciality"/></span>
                                <span className='des-item-nav'><FormattedMessage id="headerhome.idspeciality"/></span>
                            </li>
                            <li className='item-nav'>
                                <span className='sub-item-nav'><FormattedMessage id="headerhome.facilities"/></span>
                                <span className='des-item-nav'><FormattedMessage id="headerhome.clinic"/></span>
                            </li>
                            <li className='item-nav'>
                                <span className='sub-item-nav'><FormattedMessage id="headerhome.doctor"/></span>
                                <span className='des-item-nav'><FormattedMessage id="headerhome.chooseDoctor"/></span>
                            </li>
                            <li className='item-nav'>
                                <span className='sub-item-nav'><FormattedMessage id="headerhome.package"/></span>
                                <span className='des-item-nav'><FormattedMessage id="headerhome.general"/></span>
                            </li>
                        </ul>
                    </div>
                    <div className='right-content'>
                        <i className="far fa-question-circle icon-header-help"></i>
                        <span className='help-header'><FormattedMessage id="headerhome.help"/></span>
                        <span className='phone-help'>0392845906</span>
                        <span className={this.props.lang === LANGUAGES.VI ? 'help-header language-vi active' : 'help-header language-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        <span className={this.props.lang === LANGUAGES.EN ? 'help-header language-en active' : 'help-header language-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                </div>
                <div className='header-home-banner'>
                    <div className='image-banner'>
                        <div className='banner-up'>
                            <div className='title-banner'><FormattedMessage id="headerhome.medical"/></div>
                            <div className='sub-title'><FormattedMessage id="headerhome.care"/></div>
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
                                    <span className='option-title'><FormattedMessage id="headerhome.exam"/></span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-mobile-alt icon-option"></i>
                                    </div>
                                    <span className='option-title'><FormattedMessage id="headerhome.remote"/></span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-address-book icon-option"></i>
                                    </div>
                                    <span className='option-title'><FormattedMessage id="headerhome.physical"/></span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-vial icon-option"></i>
                                    </div>
                                    <span className='option-title'><FormattedMessage id="headerhome.test"/></span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-users icon-option"></i>
                                    </div>
                                    <span className='option-title'><FormattedMessage id="headerhome.health"/></span>
                                </div>

                                <div className='option-banner-child'>
                                    <div className='icon-banner'>
                                        <i className="fas fa-hospital icon-option"></i>
                                    </div>
                                    <span className='option-title'><FormattedMessage id="headerhome.dental"/></span>
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
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
