import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import Header from '../../HomePage/Header';




class DetailSpecialty extends Component {

    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    async componentDidMount() {
        
    }

    render() {
        
        return (
            <React.Fragment>
                <Header/>
                <div className='specialty-detail-container'>YES</div>
            </React.Fragment>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
