import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss'
import Header from '../../HomePage/Header';
import Footer from '../../HomePage/Section/Footer'
import {getSpecialtyDoctorById,getAllCodeService} from '../../../services/userService'


class DetailClinic extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    // async componentDidMount(){
    //     if(this.props.match && this.props.match.params && this.props.match.params.id){
    //         let res = await getSpecialtyDoctorById({
    //             id: this.props.match.params.id,
    //             location: 'ALL'
    //         })

    //         let resProvince = await getAllCodeService('PROVINCE');
    //         if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
    //             this.setState({
    //                 arrDoctorId: res.data.doctorSpecialty,
    //                 dataDetailClinic: res.data,
    //                 listProvince: resProvince.data
    //             })
    //         }

    //     }
    // }



    render() {
        // console.log("Check state doctorID: ",this.state.arrDoctorId)
        return (
            <React.Fragment>
                <Header/>
                <div className='specialty-detail-container'>
                    {/* <div className={this.state.isMore === true ? "specialty-desc extra-more": "specialty-desc"}> 
                        {this.state.dataDetailClinic && this.state.dataDetailClinic.desMarkdown && this.state.dataDetailClinic.desHTML &&
                            <div dangerouslySetInnerHTML={{__html: this.state.dataDetailClinic.desHTML }}></div>
                        }
                    </div> */}
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
