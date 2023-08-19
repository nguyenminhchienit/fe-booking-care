import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import {Modal} from 'reactstrap';

class BookingModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    componentDidMount(){
        
    }

   
    async componentDidUpdate(prevProps,prevState, snapshot){
        
    }


    render() {
        let {handleHideModal} = this.props
        return (
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
                            <div className='booking-modal-body row p-3'>
                                <div className='col-6 form-group'>
                                    <label>Họ và tên</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Email</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đặt cho ai</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lý do khám</label>
                                    <input className='form-control'></input>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button className='btn-submit btn'>Xác nhận</button>
                                <button className='btn-close btn' onClick={() => handleHideModal()}>Hủy</button>
                            </div>
                        </div>
                    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
