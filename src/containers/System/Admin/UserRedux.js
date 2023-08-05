import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


import {LANGUAGES} from "../../../utils"
import * as actions from '../../../store/actions'
 

class UserRedux extends Component {

    constructor(props){
        super(props)
        this.state = {
            genderArr: []
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    async componentDidMount() {
        this.props.getGenderStart()
        // try {
        //     let res = await getAllCodeService('gender');
        //     if(res && res.errCode === 0){
        //         this.setState({
        //             genderArr: (res.data)
        //         })
        //     }
        //     console.log("check state gender: ",this.state)
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {
        console.log("gender redux: ", this.props.genderRedux)
        return (
            <div className="user-redux-container" >
                <div className="title">Manage user redux</div>
                <div className="user-redux-body">
                    <div className='container' style={{marginTop: '20px'}}>
                        <div className='row'>
                            <div className='col-6' style={{marginBottom: '10px'}}>
                                <label>Email</label>
                                <input className='form-control' type='email'/>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="usermanage.password"/></label>
                                <input className='form-control' type='password'/>
                            </div>
                            <div className='col-6' style={{marginBottom: '10px'}}>
                                <label><FormattedMessage id="usermanage.firstName"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="usermanage.lastName"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-4' style={{marginBottom: '10px'}}>
                                <label><FormattedMessage id="usermanage.phoneNumber"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-8'>
                                <label><FormattedMessage id="usermanage.address"/></label>
                                <input className='form-control' type='text'/>
                            </div>

                            <div className='col-4' style={{marginBottom: '10px'}}>
                                <label><FormattedMessage id="usermanage.gender"/></label>
                                <select class="form-control">
                                {this.state.genderArr && this.state.genderArr.length > 0 &&
                                    this.state.genderArr.map((item,index) => {
                                        return (
                                            <option>{this.props.lang === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        )
                                    })}
                                    
                                </select>
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="usermanage.position"/></label>
                                <select class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className='col-4'>
                                <label><FormattedMessage id="usermanage.role"/></label>
                                <select class="form-control">
                                    <option selected>Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className='col-12' style={{marginBottom: '20px'}}>
                                <label><FormattedMessage id="usermanage.image"/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            
                            <button type="submit" class="btn btn-primary col-3" style={{marginLeft: '845px'}}><FormattedMessage id="usermanage.add"/></button>
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
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
