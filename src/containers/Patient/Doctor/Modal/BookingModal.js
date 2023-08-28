import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import {Modal} from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import * as actions from '../../../../store/actions'
import _ from 'lodash'
import { postPatientAppointmentService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';


class BookingModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            birthday: '',
            email: '',
            reason: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',

            isLoading: false
        }
    }

    componentDidMount(){
        this.props.getGenderStart()
    }

    buildDataGender = () => {
        let result = []
        let {genderRedux,language} = this.props;
        if(genderRedux && genderRedux.length > 0){
            genderRedux.map(item => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result
    }
   
    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.genderRedux !== prevProps.genderRedux){
            this.setState({
                genders: this.buildDataGender()
            })
        }
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.buildDataGender()
            })
        }
        if(this.props.dateTime !== prevProps.dateTime){
            if(this.props.dateTime && !_.isEmpty(this.props.dateTime)){
                let doctorId = this.props.dateTime.doctorId
                let timeType = this.props.dateTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleChangeInput = (e,id) => {
        let valueInput = e.target.value;
        let copyState = {...this.state}
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }

    buildTimeBooking = (dateTime) => {
        let {language} = this.props;
        if(dateTime && !_.isEmpty(dateTime)){
            let time = language === LANGUAGES.VI ? dateTime.timeTypeData.valueVI : dateTime.timeTypeData.valueEN

            let date = language === LANGUAGES.VI ? 
                moment.unix(+dateTime.date / 1000).format('dddd - DD/MM/YYYY') 
                : 
                moment.unix(+dateTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dateTime) => {
        let {language} = this.props;
        if(dateTime && !_.isEmpty(dateTime)){
           let doctorName = language === LANGUAGES.VI ?
                `${dateTime.doctorData.firstName} ${dateTime.doctorData.lastName}`  
                :
                `${dateTime.doctorData.lastName} ${dateTime.doctorData.firstName}`
            return doctorName
        }
        return ''
    }

    handleSubmitModal = async () => {
        // console.log("Check state submit booking modal: ",this.state)
        this.setState({
            isLoading: true
        })
        let birthday = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dateTime)
        let doctorName = this.buildDoctorName(this.props.dateTime)
        let res = await postPatientAppointmentService({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            date: this.props.dateTime.date,
            birthday: birthday,
            email: this.state.email,
            reason: this.state.reason,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        this.setState({
            isLoading: false
        })
        if(res && res.errCode === 0){
            toast.success('Booking appointment succeed!')
            this.props.handleHideModal()
            this.setState({
                fullName: '',
                phoneNumber: '',
                address: '',
                birthday: '',
                email: '',
                reason: '',
                selectedGender: '',
            })
        }else{
            toast.error('Booking appointment failed!')
        }
        
    }

    //Mac dinh thu vien se tra ve mot cai date
    onChangePickerDate = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }


    render() {
        let {handleHideModal,dateTime} = this.props
        console.log("Check dateTime props: ",dateTime)
        return (
            <LoadingOverlay
                active={this.state.isLoading}
                spinner
                text='Loading...'
            >
                <React.Fragment>
                <div className='booking-modal-container'>
                        <Modal isOpen={this.props.isOpenModal}  className={'booking-modal-wrapper'} size='lg' centered >
                            <div className='booking-modal-content'>
                                <div className='booking-modal-header'>
                                    <span className='booking-modal-title'>
                                        Thông tin đặt lịch khám bệnh
                                    </span>
                                    <i 
                                        class="fas fa-times close-modal" 
                                        onClick={() => handleHideModal()}
                                    ></i>
                                </div>
                                <div className='booking-modal-body '>
                                    <div className='intro-doctor-modal'>
                                        <ProfileDoctor doctorId={dateTime.doctorId}/>
                                    </div>
                                    
                                    <div className='form-doctor row p-3'>
                                        <div className='col-6 form-group'>
                                            <label>Họ và tên</label>
                                            <input 
                                                className='form-control'
                                                value={this.state.fullName}
                                                onChange={(e) => this.handleChangeInput(e,'fullName')}
                                            ></input>
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Số điện thoại</label>
                                            <input 
                                                className='form-control'
                                                value={this.state.phoneNumber}
                                                onChange={(e) => this.handleChangeInput(e,'phoneNumber')}
                                            ></input>
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Email</label>
                                            <input 
                                                className='form-control'
                                                value={this.state.email}
                                                onChange={(e) => this.handleChangeInput(e,'email')}
                                            ></input>
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Địa chỉ liên hệ</label>
                                            <input 
                                                className='form-control'
                                                value={this.state.address}
                                                onChange={(e) => this.handleChangeInput(e,'address')}
                                            ></input>
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Ngày sinh</label>
                                            <DatePicker
                                                value={this.state.birthday}
                                                className="form-control"
                                                onChange={this.onChangePickerDate} 
                                            ></DatePicker>
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Giới tính</label>
                                            <Select
                                                value={this.state.selectedGender}
                                                onChange={this.handleChangeSelect}
                                                options={this.state.genders}
                                            ></Select>
                                        </div>
                                        <div className='col-12 form-group'>
                                            <label>Lý do khám</label>
                                            <input 
                                                className='form-control'
                                                value={this.state.reason}
                                                onChange={(e) => this.handleChangeInput(e,'reason')}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='booking-modal-footer'>
                                    <button className='btn-submit btn' onClick={() => this.handleSubmitModal()}>Xác nhận</button>
                                    <button className='btn-close btn' onClick={() => handleHideModal()}>Hủy</button>
                                </div>
                            </div>
                        </Modal>
                </div>
                </React.Fragment>
            </LoadingOverlay>
        );
    }
}
const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
