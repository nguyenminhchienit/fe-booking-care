import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import {getAllUsers} from "../../services/userService"
import { forEach } from 'lodash';
class UserManage extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
            // console.log(this.state.arrUsers)
        }
    }


    render() {
        return (
            <div className="user-container">
                <div className='title text-center'>Manage users</div>
                <div className='user-table mt-3'>
                    <table id="customers">
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.arrUsers.map((item) => {
                            return (<tr>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='edit-user'>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className='delete-user'>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>)
                        })}
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
