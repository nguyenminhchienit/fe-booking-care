import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from "../../services/userService"
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'

class UserManage extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    handleCreateNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.message);
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit("EVENT_CLEAR_MODAL_DATA")
            }
            
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            console.log(response)
            if(response && response.errCode === 0){
                await this.getAllUsersFromReact()
            } else{
                alert(response.message)
            }       
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log("Edit user: ",user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    handleUpdateUser = async (data) => {
        try {
            let response = await editUserService(data);
            if(response && response.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
            }else{
                alert(response.message)
            }
            
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <div className="user-container">
                <ModalUser 
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    handleCreateNewUser = {this.handleCreateNewUser}
                />
                {this.state.isOpenModalEditUser && <ModalEditUser 
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent = {this.toggleUserEditModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.handleUpdateUser}
                />}
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                       Add new user
                    </button>
                </div>
                <div className='user-table mt-3'>
                    <table id="customers">
                    <tbody>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        
                            {this.state.arrUsers && this.state.arrUsers.map((item,index) => {
                                return (<tr key={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='edit-user' onClick={() => this.handleEditUser(item)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className='delete-user' onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
