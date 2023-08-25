import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from '../../../utils'
import { postCreateNewClinicService } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props){
        super(props)
        this.state = {
            nameClinic: '',
            imageBase64: '',
            desHTML: '',
            desMarkdown: '',
            address: ''
        }
    }

    async componentDidMount() {
      
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
       
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            desMarkdown: text,
            desHTML: html
        })
    }

    handleChangeText = (e,id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleChangeFileImg  = async (e) => {
        let file = e.target.files;
        let fileImg = file[0];
        if(fileImg){
            let base64 = await CommonUtils.getBase64(fileImg)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleClickSubmitClinic = async () => {
        console.log("Check state when submit specialty: ",this.state)
        let res = await postCreateNewClinicService(this.state)
        if(res && res.errCode === 0){
            toast.success("Save clinic succeed!")
            this.setState({
                nameClinic: '',
                imageBase64: '',
                desHTML: '',
                desMarkdown: '',
                address: ''
            })
        }else{
            toast.error("Save clinic failed!")
        }
    }
    
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='title'>Quản lý phòng khám</div>
                <div className='manage-specialty-content row p-3'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input 
                            type='text' 
                            className='form-control'
                            value={this.state.nameClinic}
                            onChange={(e) => this.handleChangeText(e,'nameClinic')}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input 
                            type='file' 
                            className='form-control-file' 
                            accept="image/*"
                            onChange={(e) => this.handleChangeFileImg(e)}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input 
                            type='text' 
                            className='form-control'
                            value={this.state.address}
                            onChange={(e) => this.handleChangeText(e,'address')}
                        ></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '360px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.desMarkdown}
                        />                      
                    </div>
                    <div className='btn-specialty col-12 mt-3'>
                        <button 
                            className='btn btn-primary'
                            onClick={() => this.handleClickSubmitClinic()}
                        >Lưu thông tin</button>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
       lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
