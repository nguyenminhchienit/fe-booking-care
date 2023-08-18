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
           hasOldData: false,


           listPrice: [],
           listProvince: [],
           listPayment: [],
           selectedPrice: '',
           selectedProvince: '',
           selectedPayment: '',
           addressClinic: '',
           nameClinic: '',
           note: ''
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorStart();
        this.props.fetchDoctorInfoStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
       if(prevProps.allDoctorRedux !== this.props.allDoctorRedux){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux, 'USERS')
            this.setState({
                allDoctor: dataSelect
            })
       }
       if(prevProps.lang !== this.props.lang){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux, 'USERS')
            let dataPriceSelect = this.buildDataInputSelect(this.props.listDoctorInfo.resPrice,'PRICE')
            let dataProvinceSelect = this.buildDataInputSelect(this.props.listDoctorInfo.resProvince,'PROVINCE')
            let dataPaymentSelect = this.buildDataInputSelect(this.props.listDoctorInfo.resPayment,'PAYMENT')
            this.setState({
                allDoctor: dataSelect,
                listPrice: dataPriceSelect,
                listProvince: dataProvinceSelect,
                listPayment: dataPaymentSelect
            })
       }
       if(prevProps.listDoctorInfo !== this.props.listDoctorInfo){
            // console.log("Check list doctor info: ",this.props.listDoctorInfo)
            let dataPriceSelect = this.buildDataInputSelect(this.props.listDoctorInfo.resPrice,'PRICE')
            let dataProvinceSelect = this.buildDataInputSelect(this.props.listDoctorInfo.resProvince,'PROVINCE')
            let dataPaymentSelect = this.buildDataInputSelect(this.props.listDoctorInfo.resPayment,'PAYMENT')

            console.log("Check data select: ",dataPaymentSelect,dataPriceSelect,dataProvinceSelect)

            this.setState({
                listPrice: dataPriceSelect,
                listProvince: dataProvinceSelect,
                listPayment: dataPaymentSelect
            })
       }
    }

    buildDataInputSelect = (inputData,type) => {
        let result = [];
        if(inputData && inputData.length > 0){
                if(type === 'USERS'){
                    inputData.forEach(item => {
                        let obj = {};
                        let labelVI = `${item.firstName} ${item.lastName}`
                        let labelEN =  `${item.lastName} ${item.firstName}`
                        obj.label = this.props.lang === LANGUAGES.VI ? labelVI : labelEN;
                        obj.value = item.id
                        result.push(obj)
                    })
                }
                if(type === 'PRICE'){
                    inputData.forEach(item => {
                        let obj = {};
                        let labelVI = `${item.valueVI} VND`
                        let labelEN =  `${item.valueEN} USD`
                        obj.label = this.props.lang === LANGUAGES.VI ? labelVI : labelEN;
                        obj.value = item.keyMap
                        result.push(obj)
                    })
                }
                if(type === 'PAYMENT' || type === 'PROVINCE'){
                    inputData.forEach(item => {
                        let obj = {};
                        let labelVI = `${item.valueVI}`
                        let labelEN =  `${item.valueEN}`
                        obj.label = this.props.lang === LANGUAGES.VI ? labelVI : labelEN;
                        obj.value = item.keyMap
                        result.push(obj)
                    })
                }
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
        let {listPayment,listPrice,listProvince} = this.state
        this.setState({
            selectedDoctor: options 
        })
        let res = await getDoctorInfoDetailService(options.value)
        let doctorInfo = res.data.DoctorInfo
        if(res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description 
            && res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown
            && doctorInfo.priceId && doctorInfo.provinceId && doctorInfo.paymentId && doctorInfo.note 
            && doctorInfo.addressClinic && doctorInfo.nameClinic
            ){
            let markdown = res.data.Markdown
            let findPrice = listPrice.find(item => {
                return item.value === doctorInfo.priceId
            })
            let findProvince = listProvince.find(item => {
                return item.value === doctorInfo.provinceId
            })
            let findPayment = listPayment.find(item => {
                return item.value === doctorInfo.paymentId
            })
            // console.log("find", findPrice)
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                selectedPrice: findPrice,
                selectedProvince: findProvince,
                selectedPayment: findPayment,
                addressClinic: doctorInfo.addressClinic,
                nameClinic: doctorInfo.nameClinic,
                note: doctorInfo.note

            },() => {
                console.log("Check state redux doctor info: ", this.state)
            })
        }else{
            
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

                selectedPrice: '',
                selectedProvince: '',
                selectedPayment: '',
                addressClinic: '',
                nameClinic: '',
                note: ''
            })
        }
       
    };

    handleChangeText = (e,id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
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
            action: this.state.hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note
        })
    }

    handleChangeDoctorInfoSelect = (selectedOption, name) => {
        let nameState = name.name;
        let copyState = {...this.state}
        copyState[nameState] = selectedOption;
        this.setState({
            ...copyState
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
                            onChange={(e) => this.handleChangeText(e,'description')}
                        ></textarea>
                    </div>
                    <div className='more-info-doctor row'>
                        <div className='col-4 form-group'>
                            <label>Giá</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeDoctorInfoSelect}
                                options={this.state.listPrice}
                                name="selectedPrice"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Phương thức thanh toán</label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeDoctorInfoSelect}
                                options={this.state.listPayment}
                                name="selectedPayment"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Thành phố</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeDoctorInfoSelect}
                                options={this.state.listProvince}
                                name="selectedProvince"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input
                                value={this.state.addressClinic}
                                className='form-control'
                                onChange={(e) => this.handleChangeText(e,'addressClinic')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                            <input 
                                className='form-control'
                                value={this.state.nameClinic}
                                onChange={(e) => this.handleChangeText(e,'nameClinic')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Ghi chú</label>
                            <input 
                                className='form-control'
                                value={this.state.note}
                                onChange={(e) => this.handleChangeText(e,'note')}
                            />
                        </div>
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
       allDoctorRedux: state.admin.allDoctor,
       listDoctorInfo: state.admin.listDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        createInfoDoctorStart: (data) => dispatch(actions.createInfoDoctorStart(data)),
        fetchDoctorInfoStart: () => dispatch(actions.fetchDoctorInfoStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
