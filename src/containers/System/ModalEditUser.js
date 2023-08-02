import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './ModalUser.scss'
import _ from "lodash"


class ModalEditUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        //console.log("Did mount: ",this.props.currentUser)
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'user.password',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleChangeInput = (e, type) => {
        let copyState = {...this.state}
        copyState[type] = e.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrType = ['email','password','firstName','lastName','address']

        for(let i = 0;i< arrType.length;i++){
            if(!this.state[arrType[i]]){
                isValid = false
                alert("Missing params")
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true){
            this.props.editUser(this.state)
        }
    }

    render() {
        return (
            <div className="modal-container" >
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={() => this.toggle()} 
                    className='modal-container-user'
                    size='md'
                    // centered
                >
                        <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                        <ModalBody>
                            <div className='modal-user-body'>
                                <div className="input-container">
                                    <label>Email</label>
                                    <input type='email' disabled value={this.state.email} onChange={(e) => this.handleChangeInput(e,"email")}></input>
                                </div>
                                <div className="input-container">
                                    <label>Password</label>
                                    <input type='password' disabled value={this.state.password} onChange={(e) => this.handleChangeInput(e,"password")}></input>
                                </div> 
                            </div>
                            <div className='modal-user-body'>
                                <div className="input-container">
                                    <label>First Name</label>
                                    <input type='text' value={this.state.firstName} onChange={(e) => this.handleChangeInput(e,"firstName")}></input>
                                </div>
                                <div className="input-container">
                                    <label>Last Name</label>
                                    <input type='text' value={this.state.lastName} onChange={(e) => this.handleChangeInput(e,"lastName")}></input>
                                </div> 
                            </div>
                            <div className='modal-user-body'>
                                <div className="input-container full-with-input">
                                    <label>Address</label>
                                    <input type='text' value={this.state.address} onChange={(e) => this.handleChangeInput(e,"address")}></input>
                                </div>                                
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" className='px-3' onClick={() => this.handleSaveUser()}>
                                Save changes
                            </Button>{' '}
                            <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                                Cancel
                            </Button>
                        </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);






