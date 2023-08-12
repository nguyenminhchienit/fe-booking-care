import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'

import * as actions from '../../../store/actions'
import Select from 'react-select';
import { LANGUAGES,dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';



class ManageSchedule extends Component {

    constructor(props){
        super(props)
        this.state = {
           selectedDoctor: '',
           allDoctor: [],
           currentDate: '',
           rangeScheduleTime: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorStart();
        this.props.fetchScheduleTimeStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.allDoctorRedux !== this.props.allDoctorRedux){
             let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux)
             this.setState({
                 allDoctor: dataSelect
             })
        }
        if(prevProps.lang !== this.props.lang){
             let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux)
             this.setState({
                 allDoctor: dataSelect
             })
        }

        if(prevProps.scheduleTimeRedux !== this.props.scheduleTimeRedux){
            let data;
            if(this.props.scheduleTimeRedux && this.props.scheduleTimeRedux.length > 0){
                data = this.props.scheduleTimeRedux.map((item) => ({...item, isSelected: false}))
            }
            // console.log("Check range time: ",data)
            this.setState({
                rangeScheduleTime: data
            })
        }
     }

     buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.forEach(item => {
                let obj = {};
                let labelVI = `${item.firstName} ${item.lastName}`
                let labelEN = `${item.lastName} ${item.firstName}`
                obj.label = this.props.lang === LANGUAGES.VI ? labelVI : labelEN;
                obj.value = item.id
                result.push(obj)
            });
        }

        return result;
    }

    handleChangeSelect = async (options) => {
        this.setState({
            selectedDoctor: options 
        })
        // console.log("check select: ",options)
    };

    onChangePickerDate = (date) => {
        this.setState({
            currentDate : date[0]
        })
    }

    handleSelectTime = (data) => {
        let {rangeScheduleTime} = this.state
        let dataRangeTime
        if(rangeScheduleTime && rangeScheduleTime.length > 0){
            dataRangeTime = rangeScheduleTime.map((item) => {
                if(item.id === data.id){
                    item.isSelected = !item.isSelected;
                }
                return item
            })
        }
        this.setState({
            rangeScheduleTime: dataRangeTime
        })
        // console.log("Check range time after: ",rangeScheduleTime)
    } 

    handleSaveTime = () => {
        let {selectedDoctor, rangeScheduleTime, currentDate} = this.state
        let result = []
        if(!selectedDoctor){
            toast.error('Select doctor is require');
            return;
        }

        if(!currentDate){
            toast.error('Select date is require');
            return;
        }

        let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)

        if(rangeScheduleTime && rangeScheduleTime.length > 0){
            let selectedTime = rangeScheduleTime.filter(item => item.isSelected == true)
            selectedTime.map((schedule) => {
                let obj = {}
                obj.doctorId = selectedDoctor.value
                obj.date = formatDate
                obj.time = schedule.keyMap
                result.push(obj)
            })
        }

        console.log("Check selected time: ",result)
    }

    render() {
        // console.log("Check date: ",this.state.rangeScheduleTime)
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className='title mb-3'>
                        ManageDoctor Schedule
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.allDoctor}
                                />
                            </div>
                            <div className='col-6'>
                                <label>Chọn ngày</label>
                                <DatePicker
                                    onChange = {this.onChangePickerDate}
                                    className="form-control"
                                    value={this.state.currentDate} //currentDate[0]: phan tu thu 0 moi tra ve dung ding dang ngay
                                    minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 manage-schedule'>
                                {this.state.rangeScheduleTime && this.state.rangeScheduleTime.length > 0 && 
                                    this.state.rangeScheduleTime.map((item,index) => {
                                            {/* console.log("item",item) */}
                                        return (
                                            <button 
                                                className={item.isSelected === true ? 'btn btn-time active': 'btn btn-time'}
                                                key={index}
                                                onClick={() => this.handleSelectTime(item)}
                                            >
                                                {this.props.lang === LANGUAGES.VI  ? item.valueVI : item.valueEN}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary' onClick={() => this.handleSaveTime()}>Lưu thông tin</button>
                            </div>
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
        allDoctorRedux: state.admin.allDoctor,
        scheduleTimeRedux: state.admin.scheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        fetchScheduleTimeStart: () => dispatch(actions.fetchScheduleTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
