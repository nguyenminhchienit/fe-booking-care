import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    

    render() {

        return (
            <div className="home-admin-wrapper title mt-5">
                Xin chào bạn đến với trang quản lý TakisCare
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
