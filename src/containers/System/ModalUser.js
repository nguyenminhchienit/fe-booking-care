import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './ModalUser.scss'
class ModalUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true){
            this.props.handleCreateNewUser(this.state)
        }
    }

    render() {
        return (
            <div className="modal-container" >
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={() => this.toggle()} 
                    className='modal-container-user'
                    size='lg'
                    // centered
                >
                        <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                        <ModalBody>
                            <div className='modal-user-body'>
                                <div className="input-container">
                                    <label>Email</label>
                                    <input type='email' value={this.state.email} onChange={(e) => this.handleChangeInput(e,"email")}></input>
                                </div>
                                <div className="input-container">
                                    <label>Password</label>
                                    <input type='password' value={this.state.password} onChange={(e) => this.handleChangeInput(e,"password")}></input>
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
                            <Button color="primary" className='px-3' onClick={() => this.handleAddNewUser()}>
                                Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);






