import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss'
import Header from '../../HomePage/Header';
import Footer from '../../HomePage/Section/Footer'
import {getClinicDoctorById} from '../../../services/userService'


class DetailClinic extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: '',
            dataDetailClinic: "",
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getClinicDoctorById({
                id: this.props.match.params.id,
            })

           
            if(res && res.errCode === 0 ){
                this.setState({
                    arrDoctorId: res.data.doctorSpecialty,
                    dataDetailClinic: res.data,
                })
            }

        }
    }



    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className='specialty-detail-container'>
                    <div className={this.state.isMore === true ? "specialty-desc extra-more": "specialty-desc"}> 
                        {this.state.dataDetailClinic && this.state.dataDetailClinic.descMarkdown && this.state.dataDetailClinic.descHTML &&
                            <div dangerouslySetInnerHTML={{__html: this.state.dataDetailClinic.descHTML }}></div>
                        }
                    </div>
                </div>
                <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
