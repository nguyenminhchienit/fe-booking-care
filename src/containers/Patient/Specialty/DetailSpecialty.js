import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getSpecialtyDoctorById,getAllCodeService} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            isMore: true,
            listProvince: []
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getSpecialtyDoctorById({
                id: this.props.match.params.id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE');
            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                this.setState({
                    arrDoctorId: res.data.doctorSpecialty,
                    dataDetailSpecialty: res.data,
                    listProvince: resProvince.data
                })
            }

        }
    }

    handleMoreSpecialty = () => {
        this.setState({
            isMore: !this.state.isMore
        })
    }

    handleChangSelectProvince = async (e) => {
        // console.log("Change e: ",e.target.value)
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getSpecialtyDoctorById({
                id: this.props.match.params.id,
                location: e.target.value
            })
            
            if(res && res.errCode === 0 ){
                this.setState({
                    arrDoctorId: res.data.doctorSpecialty
                },() => {
                    console.log("Check handle change: ",this.state.arrDoctorId)
                })
            }
        }
    }

    render() {
        let {listProvince} = this.state
        let {lang} = this.props
        // console.log("Check state doctorID: ",this.state.arrDoctorId)
        return (
            <React.Fragment>
                <Header/>
                <div className='specialty-detail-container'>
                    <div className={this.state.isMore === true ? "specialty-desc extra-more": "specialty-desc"}> 
                        {this.state.dataDetailSpecialty && this.state.dataDetailSpecialty.desMarkdown && this.state.dataDetailSpecialty.desHTML &&
                            <div dangerouslySetInnerHTML={{__html: this.state.dataDetailSpecialty.desHTML }}></div>
                        }
                        <span 
                            className='more' 
                            onClick={() => this.handleMoreSpecialty()}
                        >{this.state.isMore === true ? <span>Xem thêm</span> : <span>Ẩn chi tiết</span>}</span>
                    </div>
                    <div className='search-specialty-province'>
                        <select onChange={(e) => this.handleChangSelectProvince(e)} className='select-wrapper'>
                            <option value='ALL' className='option-select'>Tất cả</option>
                            {listProvince && listProvince.length > 0 &&
                            listProvince.map((item,index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {lang === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {this.state.arrDoctorId && this.state.arrDoctorId.length > 0 &&
                    this.state.arrDoctorId.map((item,index) => {
                        return (
                            <div className='each-doctor' key={index}>
                                <div className='content-left-item'>
                                    <ProfileDoctor 
                                        doctorId={item.doctorId}
                                        isMoreInfo={true}
                                    />
                                    
                                </div>
                                <div className='content-right-item'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule
                                            doctorIdFromParent = {item.doctorId}
                                        />
                                    </div>
                                    <div className='doctor-extra-info'>
                                        <DoctorExtraInfo
                                            doctorIdFromParent = {item.doctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
