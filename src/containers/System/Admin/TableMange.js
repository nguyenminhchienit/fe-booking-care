import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManage.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}



class TableManage extends Component {

    constructor(props){
        super(props)
        this.state = {
            usersArr: []
        }
    }

    async componentDidMount() {
        this.props.fetchUserStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.usersRedux !== this.props.usersRedux){
            this.setState({
                usersArr: this.props.usersRedux
            })
        }
    }
    
    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        console.log('check user redux: ',this.props.users)
        return (
            <React.Fragment>
                <div className="user-container">
                    <div className='user-table mt-3'>
                        <table id="table-manage">
                        <tbody>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            
                                {this.state.usersArr && this.state.usersArr.map((item,index) => {
                                    return (<tr key={index}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='edit-user' onClick={() => this.handleEditUser(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='delete-user' onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserStart: () => dispatch(actions.fetchUserStart()),
        deleteUser: (id) => dispatch(actions.DeleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
