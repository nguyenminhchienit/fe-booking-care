import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HandBook.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {getAllHandbookService} from '../../../services/userService.js'
import { withRouter } from 'react-router-dom';

class HandBook extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataHandbook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandbookService()
        if(res && res.errCode === 0){
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (handbook) => {
        console.log(handbook.id)
        //Chuyen huong vao trang deatil-doctor ( nho import thu vien withRoute va boc het component)
        if(this.props.history){
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
          };
        return (
            <React.Fragment>
                <div className='seation-handbook'>
                    <div className='handbook-container'>
                        <div className='handbook-header'>
                            <h2 className='handbook-title'><FormattedMessage id="homepage.handbook"/></h2>
                            <button className='handbook-btn'><FormattedMessage id="homepage.more"/></button>
                        </div>
                        <div className='handbook-body'>
                            <Slider {...settings}>
                                    {this.state.dataHandbook && this.state.dataHandbook.length > 0 &&
                                    this.state.dataHandbook.map((item,index) => {
                                        return (
                                            <div className='img-customize' key={index}>
                                                <div className='handbook-body-info' onClick={() => this.handleViewDetailHandbook(item)}>
                                                    <div className='handbook-thumb'
                                                        style={{backgroundImage: `url(${item.image})`}}
                                                    />                  
                                                    <div className='handbook-title-info'>{item.topicHandbook}</div>
                                                </div>
                                             </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
