import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../HomePage/Header';
import './DetailDoctor.scss'
import {getDoctorInfoDetailService} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';

class DetailDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getDoctorInfoDetailService(this.props.match.params.id)
            // console.log('Check detail info dotor res: ', res)
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data
                })
            }

        }
    }
    render() {
        //Lay id tu link trinh duyet
        console.log(this.props.match.params.id)
        let nameVI,nameEN;
        if(this.state.detailDoctor && this.state.detailDoctor.positionData){
            nameVI = `${this.state.detailDoctor.positionData.valueVI}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName}`
            nameEN = `${this.state.detailDoctor.positionData.valueEN}, ${this.state.detailDoctor.lastName} ${this.state.detailDoctor.firstName}`
        }
        return (
            <React.Fragment>
                <Header isShowBanner = {false}/>
                <div className="detail-doctor-container">
                    <div className='doctor-info'>
                        <div className='content-left'>
                            <div 
                                className='img-doctor'
                                style={{backgroundImage: `url(${this.state.detailDoctor.image ? this.state.detailDoctor.image : '' })`}}
                            ></div>
                        </div>
                        <div className='content-right'>
                            <div className='doctor-name'>
                                {this.props.lang === LANGUAGES.VI ? nameVI : nameEN}
                            </div>
                            {this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.description
                                && <p className='doctor-desc'>{this.state.detailDoctor.Markdown.description}</p>
                            }
                        </div>
                    </div>
                    <div className='doctor-schedule'>
                        <div className="content-left">
                            <DoctorSchedule 
                                doctorIdFromParent = {this.state.detailDoctor && this.state.detailDoctor.id ?
                                this.state.detailDoctor.id : -1}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfo 
                                doctorIdFromParent = {this.state.detailDoctor && this.state.detailDoctor.id ?
                                this.state.detailDoctor.id : -1}
                            />
                        </div>
                    </div>
                    <div className='doctor-info-detail'>
                        {this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{__html: this.state.detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='doctor-review'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
