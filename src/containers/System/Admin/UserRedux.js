import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import {LANGUAGES, CRUD_ACTION, CommonUtils} from "../../../utils"
import * as actions from '../../../store/actions'
import './UserRedux.scss'

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableMange from './TableMange';


class UserRedux extends Component {

    constructor(props){
        super(props)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            isOpen: false,
            previewAvatar: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: '',
            position: '',
            avatar: '',
            address: '',
            phoneNumber: '',
            gender: '',

            action: '',
            userIdEdit: ''
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()       
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : ''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : ''
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : ''
            })
        }

        if(prevProps.usersRedux !== this.props.usersRedux){
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : '',
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : '',
                avatar: '',
                address: '',
                previewAvatar: '',
                phoneNumber: '',
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : '',
                action: CRUD_ACTION.CREATE
            })
        }
    }

    handleChangeFileImg  = async (e) => {
        let file = e.target.files;
        let fileImg = file[0];
        if(fileImg){
            let base64 = await CommonUtils.getBase64(fileImg)
            let imgURL = URL.createObjectURL(fileImg);
            this.setState({
                previewAvatar: imgURL,
                avatar: base64
            })
        }
    }

    handleImgAvatar = () => {
        if(this.state.previewAvatar){
            this.setState({
                isOpen: true
            })
        }
    }

    handleChangeInput = (e,id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSubmit = () => {
        let isValid = this.checkValidateInput();
        if(!isValid) return;

        //fire action
        if(this.state.action === CRUD_ACTION.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if(this.state.action === CRUD_ACTION.EDIT){
            this.props.editUser({
                id: this.state.userIdEdit,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
    }

    checkValidateInput = () => {
        let arrCheck = ['email','password','firstName','lastName','address','phoneNumber'];
        let isValid = true;
        for(let i=0;i<arrCheck.length;i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert("The input require: "+arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer (user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            previewAvatar: imageBase64,
            userIdEdit: user.id,

            action: CRUD_ACTION.EDIT
        })
    }


    render() {
        let {email,password,firstName,lastName,address,phoneNumber,role,position,gender} = this.state;
        return (
            <div className="user-redux-container" >
                <div className="title">Manage user redux</div>
                <div className="user-redux-body">
                    <div className='container' style={{marginTop: '20px'}}>
                        <div className='row'>
                            <div className='col-6' style={{marginBottom: '10px'}}>
                                <label>Email</label>
                                <input 
                                    className='form-control' type='email' value={email}
                                    onChange={(e) => this.handleChangeInput(e,"email")}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="usermanage.password"/></label>
                                <input 
                                    className='form-control' type='password' value={password}
                                    onChange={(e) => this.handleChangeInput(e,"password")}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6' style={{marginBottom: '10px'}}>
                                <label><FormattedMessage id="usermanage.firstName"/></label>
                                <input 
                                    className='form-control' type='text' value={firstName}
                                    onChange={(e) => this.handleChangeInput(e,"firstName")}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="usermanage.lastName"/></label>
                                <input 
                                    className='form-control' type='text' value={lastName}
                                    onChange={(e) => this.handleChangeInput(e,"lastName")}
                                />
                            </div>
                            <div className='col-4' style={{marginBottom: '10px'}}>
                                <label><FormattedMessage id="usermanage.phoneNumber"/></label>
                                <input 
                                    className='form-control' type='text' value={phoneNumber}
                                    onChange={(e) => this.handleChangeInput(e,"phoneNumber")}
                                />
                            </div>
                            <div className='col-8'>
                                <label><FormattedMessage id="usermanage.address"/></label>
                                <input 
                                    className='form-control' type='text' value={address}
                                    onChange={(e) => this.handleChangeInput(e,"address")}
                                />
                            </div>

                            <div className='col-4' style={{marginBottom: '20px'}}>
                                <label><FormattedMessage id="usermanage.gender"/></label>
                                <select class="form-control" value={gender} onChange={(e) => this.handleChangeInput(e,"gender")}>
                                {this.state.genderArr && this.state.genderArr.length > 0 &&
                                    this.state.genderArr.map((item,index) => {
                                        return (
                                            <option 
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {this.props.lang === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        )
                                })}
                                    
                                </select>
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="usermanage.position"/></label>
                                <select class="form-control" value={position} onChange={(e) => this.handleChangeInput(e,"position")}>
                                    {this.state.positionArr && this.state.positionArr.length > 0 &&
                                        this.state.positionArr.map((item,index) => {
                                            return (
                                                <option 
                                                    key={index}
                                                    value={item.keyMap}
                                                >
                                                    {this.props.lang === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                    })}
                                </select>
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="usermanage.role"/></label>
                                <select class="form-control" value={role} onChange={(e) => this.handleChangeInput(e,"role")}>
                                    {this.state.roleArr && this.state.roleArr.length > 0 &&
                                        this.state.roleArr.map((item,index) => {
                                            return (
                                                <option 
                                                    key={index}
                                                    value={item.keyMap}
                                                >
                                                    {this.props.lang === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                    })}
                                </select>
                            </div>

                            
                            <div className='previewImg'>
                                <div className='col-12'>
                                    <label><FormattedMessage id="usermanage.image"/></label>
                                    <input type='file' id='file'  onChange={(e) => this.handleChangeFileImg(e)} hidden accept="image/*"/>
                                    <label className='label-upload' htmlFor='file'><i class="fas fa-cloud-upload-alt"></i></label>
                                </div>
                                <div className='preAvatar' onClick={() => this.handleImgAvatar()} style={{backgroundImage: `url(${this.state.previewAvatar})`}}></div>
                            </div>
                            {this.state.isOpen === true && <Lightbox
                                mainSrc={this.state.previewAvatar}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                                
                            />}
                                <button 
                                    type="submit" class= {this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning col-4' : "btn btn-primary col-4"}
                                    style={{marginLeft: '750px' , marginTop: '-50px'}}
                                    onClick={() => this.handleSubmit()}
                                >
                                    {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="usermanage.edit"/> : <FormattedMessage id="usermanage.add"/>}
                                    
                                </button>

                                <div className='col-12 mb-5'>
                                    <TableMange
                                        handleEditUserFromParent= {this.handleEditUserFromParent}
                                        action = {this.state.action}
                                    />
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.EditUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
