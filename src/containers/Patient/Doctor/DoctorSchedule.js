import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'

import {getScheduleDoctorService} from '../../../services/userService'

import { LANGUAGES } from '../../../utils';

class DoctorSchedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            allDays: []
        }
    }

    componentDidMount(){
        let {language} = this.props;

        this.setArrDayLanguage(language)
    }

    

    setArrDayLanguage = async (language) => {
        console.log(moment(new Date()).format('dddd - DD/MM'))
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'))

        let arrDate = [];
        for(let i=0;i<7;i++){
            let obj = {};
            if(LANGUAGES.VI === language){
                obj.label = moment(new Date()).add(i,'days').format('dddd - DD/MM')
            }else{
                obj.label = moment(new Date()).add(i,'days').locale('en').format('ddd - DD/MM')
            }
            obj.value = moment(new Date()).add(i,'days').startOf('day').valueOf()

            arrDate.push(obj)
        }


        console.log("allDate: ",arrDate)
        this.setState({
            allDays: arrDate
        })
    }

    componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.language !== prevProps.language){
            this.setArrDayLanguage(this.props.language)
        }
    }

    handleChangeSelect = async (e) => {
        let res
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            res = await getScheduleDoctorService(e.target.value,this.props.doctorIdFromParent)
            console.log(res)
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                   <div className='allDays'>
                        <select onChange={(e) => this.handleChangeSelect(e)}>
                            {this.state.allDays && this.state.allDays.length > 0 && this.state.allDays.map((item,index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                   </div>
                   <div className='allTimes'>

                   </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
