import React, { Component } from 'react';
import {CommonUtils} from '../../../utils'
import { connect } from 'react-redux';
import './ManageHandbook.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {

    constructor(props){
        super(props)
        this.state = {
            topicHandbook: '',
            desHTML: '',
            desMarkdown: '',
            imageBase64: ''
        }
    }

    componentDidMount() {
        
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

    handleClickSubmitHandbook = async () => {
        console.log("Check state when submit specialty: ",this.state)
    }

    render() {
    
        return (
            <React.Fragment>
                <div className='manage-handbook-container'>
                        <div className='title mt-3'>
                            Handbook
                        </div>
                        <div className='manage-handbook-content row p-3'>
                        <div className='col-6 form-group'>
                            <label>Chủ đề cẩm nang</label>
                            <input 
                                type='text' 
                                className='form-control'
                                value={this.state.topicHandbook}
                                onChange={(e) => this.handleChangeText(e,'topicHandbook')}
                            ></input>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Ảnh cẩm nang</label>
                            <input 
                                type='file' 
                                className='form-control-file' 
                                accept="image/*"
                                onChange={(e) => this.handleChangeFileImg(e)}
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
                        <div className='btn-handbook col-12 mt-3'>
                            <button 
                                className='btn btn-primary'
                                onClick={() => this.handleClickSubmitHandbook()}
                            >Lưu thông tin</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ManageHandbook));
