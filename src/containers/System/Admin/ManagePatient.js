import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'

import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import {getListPatientForDoctorService} from '../../../services/userService'
import moment from 'moment';


class ManagePatient extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let res = await getListPatientForDoctorService({
            date: new Date(this.state.currentDate).getTime(),
            doctorId: this.props.user.id
        })
        if(res && res.errCode === 0){
            console.log("Check res patient: ",res)
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        
     }


    handleChangeSelect = async (options) => {
        this.setState({
            selectedDoctor: options 
        })
        // console.log("check select: ",options)
    };

    onChangePickerDate = async (date) => {
        let res = await getListPatientForDoctorService({
            date: new Date(date[0]).getTime(),
            doctorId: this.props.user.id
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
        this.setState({
            currentDate : date[0]
        })
    }

    getPreviousDay = (date = new Date()) => {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
      
        return previous;
    }

    render() {
        // console.log("Check date: ",this.props)
        let {dataPatient} = this.state
        let {lang} = this.props
        return (
            <React.Fragment>
                <div className="manage-patient-container">
                    <div className='title mb-3'>
                        ManageDoctor Patient
                    </div>
                    <div className='manage-patient-body row p-3'>
                        <div className='col-6'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange = {this.onChangePickerDate}
                                className="form-control"
                                value={this.state.currentDate} //currentDate[0]: phan tu thu 0 moi tra ve dung ding dang ngay
                                minDate={this.getPreviousDay()}
                            />
                        </div>
                        <div className='col-12'>
                        <table id="table-manage-patient">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPatient && dataPatient.length > 0 &&
                                dataPatient.map((item,index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{lang === LANGUAGES.VI === true ? item.timeData.valueVI : item.timeData.valueEN}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.email}</td>
                                            <td>{lang === LANGUAGES.VI ? item.patientData.genderData.valueVI : item.patientData.genderData.valueEN}</td>
                                            <td>
                                                <button className='confirm-patient' >
                                                    <i class="fas fa-check"></i>
                                                </button>
                                                <button className='delete-patient'>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
