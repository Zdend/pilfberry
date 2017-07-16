import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { push } from 'react-router-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { getPost, getPostEditPage } from '../../reducers/selectors';
import {
    fetchPostAction,
    postValueChangeAction,
    savePostAction,
    createPostAction
} from '../../actions/post-actions';
import InputHOC from '../../components/connected-input-hoc';
import { NEW_ID, POST_STATUSES, DATE_FORMAT, POST_CATEGORIES } from '../../../../shared/constants';
import RichEditor from '../../components/rich-editor';
import { SpinnerIcon } from '../../components/spinner';
import MetaTag from '../../components/structure/meta';


class PostEditPage extends Component {
    componentDidMount() {
        const { match: { params: { id } }, post, createPostAction } = this.props;
        if (id !== NEW_ID) {
            this.props.fetchPost({ id });
        } else if (!post) {
            createPostAction();
        }
    }

    render() {
        const { match: { params: { id } }, post, postValueChangeAction, savePost, navigate, saving } = this.props;
        const handleChange = (field, value) => postValueChangeAction(id, field, value);
        const handleChangeForEvent = (field, e) => handleChange(field, e.target.value);
        const ConnectedInput = InputHOC(handleChangeForEvent);
        const PostInput = ({ value, field, ...rest }) => <ConnectedInput value={post.getIn([...field.split('.')])} {...{ ...rest, field }} />;
        const handleContentChange = value => handleChange('content', value);

        return (
            <div className="padding-bottom-2x">
                <MetaTag title="Edit post" />
                {post &&
                    <div>
                        <h1 className="margin-top-1x">{post.get('title') || '<Post Name>'}</h1>

                        <Row>
                            <Col sm={6}>
                                <PostInput label="Post name" field="title" />
                            </Col>

                            <Col sm={6}>
                                <FormGroup>
                                    <ControlLabel>Pilfberry URL</ControlLabel>
                                    <FormControl.Static>/{post.get('path')}</FormControl.Static>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8}>
                                <ControlLabel>Post</ControlLabel>
                                <RichEditor value={post.get('content')}
                                    changeAction={handleContentChange}
                                    placeholder="Write your post.." />
                            </Col>
                        </Row>

                        <Row className="margin-top-2x">
                            <Col sm={4}>
                                <PostInput label="Status" field="status" type="select" selectValues={POST_STATUSES} />
                            </Col>

                            <Col sm={4}>
                                <PostInput label="Categories" field="category" type="select" selectValues={POST_CATEGORIES} />
                            </Col>

                            <Col sm={4}>
                                <ControlLabel>Last updated</ControlLabel>
                                <FormControl.Static>
                                    {post.get('lastUpdated') || post.get('dateCreated') ? moment(post.get('lastUpdated') || post.get('dateCreated')).format(DATE_FORMAT) : 'Not Specified'}
                                </FormControl.Static>
                            </Col>
                        </Row>


                        <Button bsStyle="primary" className="margin-top-3x margin-right-1x" disabled={saving} onClick={() => savePost(id)}>
                            <i className="fa fa-save margin-right-05x" />Save {saving && <SpinnerIcon />}
                        </Button>

                        <Button bsStyle="default" className="margin-top-3x" onClick={() => navigate('/secure/posts')}>
                            Back
                        </Button>

                    </div>
                }


            </div>
        );
    }
}
function mapStateToProps(state, props) {
    const { match: { params: { id } } } = props;
    return {
        post: getPost(id)(state),
        saving: getPostEditPage(state).get('saving')
    };
}
const mapDispatchToProps = (dispatch, props) => {
    const { match: { params: { id } } } = props;
    return {
        fetchPost: bindActionCreators(fetchPostAction.request, dispatch),
        postValueChangeAction: bindActionCreators(postValueChangeAction, dispatch),
        navigate: bindActionCreators(push, dispatch),
        savePost: bindActionCreators(savePostAction.request, dispatch),
        createPostAction: bindActionCreators(createPostAction, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostEditPage);