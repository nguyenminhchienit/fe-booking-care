import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './About.scss'


class About extends Component {

    render() {
       
        return (
            <React.Fragment>
                <div className='about-wrapper'>
                    <div className='about-container'>
                        <div className='about-title'>Truyền thông nói về TakisCare</div>
                        <div className='about-content'>
                            <div className='about-left'>
                                <iframe 
                                    width="100%" height="320px" 
                                    src="https://www.youtube.com/embed/j6iuGkKEqek" 
                                    title="YouTube video player" frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                            <div className='about-right'>
                                <div className='about-title'>
                                    Khám sức khỏe định kỳ có ý nghĩa như thế nào trong việc dự phòng bệnh tật?
                                </div>
                                <div className='about-des'>
                                    Khám sức khỏe định kỳ là cách hiệu quả để bảo vệ sức khỏe bản thân cũng như có thể phòng ngừa 
                                    được nhiều bệnh lý nguy hiểm. Không những đánh giá được tình trạng sức khỏe hiện tại mà khám sức 
                                    khỏe định kỳ còn giúp phát hiện sớm các nguy cơ có thể gây bệnh trong tương lai.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
