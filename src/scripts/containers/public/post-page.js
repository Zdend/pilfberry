import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Editor } from 'draft-js';
import { fetchPostAction } from '../../actions/post-actions';
import { getPostByPath } from '../../reducers/selectors';
import { SpinnerInline } from '../../components/spinner';
import { convertText, getBlockStyle, convertToPlainText } from '../../services/rich-utils';
import MetaTag from '../../components/structure/meta';
import { HOSTNAME } from '../../../../shared/constants';
import FBShareButton from '../../components/fb-share-button';

class PostPage extends Component {
    componentDidMount() {
        const { match: { params: { path } }, fetchPost, post } = this.props;
        if (!post || !post.get('id')) {
            fetchPost({ path });
        }
    }

    render() {
        const { post } = this.props;
        if (!post) {
            return (<Grid><Row><Col sm={12} className="padding-top-2x padding-bottom-2x"><SpinnerInline /></Col></Row></Grid>);
        }

        const plainTextDescription = convertToPlainText(post.get('content')).replace(/[\n\r]/g, '');
        const shareURL = `${HOSTNAME}/${post.get('path')}`;
        const description = `${plainTextDescription.substr(0, 250)}...`;

        return (
            <Grid>
                <MetaTag
                    title={post.get('title')}
                    description={description}
                    social
                    url={shareURL}
                />

                
                <h1>{post.get('title')}</h1>
                <Editor blockStyleFn={getBlockStyle}
                    readOnly
                    editorState={convertText(post.get('content'))} />

                <div className="margin-top-2x margin-bottom-2x">
                    <LinkContainer to="/"><Button bsStyle="link"><i className="fa fa-chevron-left margin-right-05x" /> Back</Button></LinkContainer>
                    <FBShareButton url={shareURL} description={description} className="pull-right" />
                </div>
            </Grid>
        );
    }
}

function mapStateToProps(state, props) {
    const { match: { params: { path } } } = props;
    return {
        post: getPostByPath(path)(state)
    };
}
const mapDispatchToProps = {
    fetchPost: fetchPostAction.request
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

