import React, { Component } from 'react';
import { connect } from 'react-redux';


class ErrorLink extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    

    render() {

        return (
            <div className="home-admin-wrapper title mt-5">
                Đường dẫn không tại
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorLink);
