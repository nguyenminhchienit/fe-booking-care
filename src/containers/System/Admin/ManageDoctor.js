import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import {getDoctorInfoDetailService} from '../../../services/userService'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props){
        super(props)
        this.state = {
           contentMarkdown: '',
           contentHTML: '',
           selectedDoctor: '',
           description: '',
           allDoctor: [],
           hasOldData: false
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
       if(prevProps.allDoctorRedux !== this.props.allDoctorRedux){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux)
            this.setState({
                allDoctor: dataSelect
            })
       }
       if(prevProps.lang !== this.props.lang){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux)
            this.setState({
                allDoctor: dataSelect
            })
       }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.forEach(item => {
                let obj = {};
                let labelVI = `${item.firstName} ${item.lastName}`
                let labelEN = `${item.lastName} ${item.firstName}`
                obj.label = this.props.lang === LANGUAGES.VI ? labelVI : labelEN;
                obj.value = item.id
                result.push(obj)
            });
        }

        return result;
    }

    handleEditorChange = ({ html, text }) => {
        console.log("html",html);
        console.log('text',text)
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChangeSelect = async (options) => {
        this.setState({
            selectedDoctor: options 
        })
        let res = await getDoctorInfoDetailService(options.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description && res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown){
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
       
    };

    handleChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleSaveContentMarkdown = () => {
        console.log("id doctor: ",this.state.allDoctor.value)
        console.log('doctor: ',this.state)
        this.props.createInfoDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
    }
    
    render() {
        console.log('check doctor redux: ',this.state)

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title mb-3'>
                    Thêm thông tin bác sĩ
                </div>
                <div className='des-doctor'>
                    <div className='content-doctor-left mb-3'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.allDoctor}
                        />
                    </div>
                    <div className='content-doctor-right mb-3'>
                        <label>Thông tin mô tả</label>
                        <textarea 
                            className='form-control' 
                            rows='5'
                            value={this.state.description}
                            onChange={(e) => this.handleChangeDesc(e)}
                        ></textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button 
                    className='save-info-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}
                >{this.state.hasOldData === true ? 'Sửa thông tin' : 'Thêm thông tin'}
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
       lang: state.app.language,
       allDoctorRedux: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        createInfoDoctorStart: (data) => dispatch(actions.createInfoDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
