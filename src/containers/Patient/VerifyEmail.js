import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import { postVerifyAppointmentService } from '../../services/userService';
import Header from '../HomePage/Header';


class VerifyEmail extends Component {
    constructor(props){
        super(props)
        this.state = {
            statusConfirm: false,
            errCode: -1
        }
    }

    async componentDidMount(){
        // console.log("Check props: ",this.props)
        if(this.props.location && this.props.location.search){
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId')
            let res = await postVerifyAppointmentService({
                token: token,
                doctorId: doctorId
            })
            if(res && res.errCode === 0){
                this.setState({
                    statusConfirm: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusConfirm: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
            }
        }



   
    render() {
        
        return (
            <>
               <Header/>
               <div className='verify-email-container'>
                    {this.state.statusConfirm === false ?
                        <div className='loading'>Loading data......</div>
                        :(
                            this.state.errCode === 0 ?
                            <div className='verify-success'>
                            
                            </div>
                            :
                            <div className='verify-failed'>
                            
                            </div>
                        )
                    }
               </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
