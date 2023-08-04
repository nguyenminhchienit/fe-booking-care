import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

import {LANGUAGES} from "../../utils"
import { changeLanguageApp } from '../../store/actions/appActions';

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='action-system'>
                    <div className='languages'>
                        <span className={this.props.lang === LANGUAGES.VI ? 'language language-vi active' : 'language language-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        <span className={this.props.lang === LANGUAGES.EN ? 'language language-en active' : 'language language-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        Log out
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
