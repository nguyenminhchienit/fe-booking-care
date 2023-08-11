import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'

import * as actions from '../../../store/actions'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';



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
            this.setState({
                rangeScheduleTime: this.props.scheduleTimeRedux
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
        console.log("check select: ",options)
    };

    onChangePickerDate = (date) => {
        this.setState({
            currentDate : date
        },() => {
            console.log("Check date: ",this.state.currentDate)
        })
    }

    render() {
        console.log("Check date: ",this.state.rangeScheduleTime)
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
                                    value={this.state.currentDate[0]} //currentDate[0]: phan tu thu 0 moi tra ve dung ding dang ngay
                                    minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 manage-schedule'>
                                {this.state.rangeScheduleTime && this.state.rangeScheduleTime.length > 0 && 
                                    this.state.rangeScheduleTime.map((item,index) => {
                                            console.log("item",item)
                                        return (
                                            <button className='btn btn-time' key={index}>
                                                {this.props.lang === LANGUAGES.VI  ? item.valueVI : item.valueEN}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary'>Lưu thông tin</button>
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
