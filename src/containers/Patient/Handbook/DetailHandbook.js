import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailHandbook.scss'
import Header from '../../HomePage/Header';
import Footer from '../../HomePage/Section/Footer'
import {getHandbookByIdService} from '../../../services/userService'



class DetailHandbook extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataDetailHandbook: {},
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getHandbookByIdService({
                id: this.props.match.params.id,
            })

            console.log("Check handbook: ",res)

           
            if(res && res.errCode === 0 ){
                this.setState({
                    dataDetailHandbook: res.data,
                })
            }

        }
    }



    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className='handbook-detail-container'>
                    <div className='handbook-desc'> 
                        {this.state.dataDetailHandbook && this.state.dataDetailHandbook.desMarkdown && this.state.dataDetailHandbook.desHTML &&
                            <div dangerouslySetInnerHTML={{__html: this.state.dataDetailHandbook.desHTML }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
