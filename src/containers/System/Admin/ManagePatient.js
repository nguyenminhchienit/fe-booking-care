import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'

import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';




class ManagePatient extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentDate: ''
        }
    }

    async componentDidMount() {
       
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        
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

    getPreviousDay = (date = new Date()) => {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
      
        return previous;
    }

    render() {
        // console.log("Check date: ",this.state.rangeScheduleTime)
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
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Berglunds snabbköp</td>
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                            <tr>
                                <td>Ernst Handel</td>
                                <td>Roland Mendel</td>
                                <td>Austria</td>
                            </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
