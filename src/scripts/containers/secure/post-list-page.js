import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Checkbox, FormControl, Row, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getSavedPosts } from '../../reducers/selectors';
import { fetchPostsAction, createPostAction, deletePostAction } from '../../actions/post-actions';
import { NEW_ID, STATUS_ACTIVE, STATUS_DELETED } from '../../../../shared/constants';
import { matchesSomeFields, splitSearchExpression } from '../../services/util';
import MetaTag from '../../components/structure/meta';

class PostListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDeleted: false,
            searchQuery: ''
        };
        this.displayDeleted = this.displayDeleted.bind(this);
        this.onSeachQueryChange = this.onSeachQueryChange.bind(this);
        this.navigateToNewPost = () => props.navigate(`/secure/post/${NEW_ID}`);
    }
    componentDidMount() {
        this.props.fetchPosts();
    }

    displayDeleted(e) {
        const displayDeleted = e.target.checked;
        this.setState({ displayDeleted }, () => this.props.fetchPosts(displayDeleted ? { status: STATUS_DELETED } : {}));
    }

    onSeachQueryChange(e) {
        this.setState({ searchQuery: e.target.value });
    }

    renderRow(post, navigate, deletePostAction) {
        const id = post.get('id');

        return (
            <tr key={id} className="clickable" onClick={() => navigate(`/secure/post/${id}`)}>
                <td>{post.get('title')}</td>

                <td>{post.get('status')}</td>
                <td>
                    {post.get('status') !== STATUS_DELETED &&
                        <Button
                            bsSize="xs"
                            bsStyle="danger"
                            className="margin-right-05x margin-bottom-05x"
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePostAction(id);
                            }}>
                            Delete
                        </Button>
                    }
                </td>
            </tr>
        );
    }

    renderPosts(posts, navigate, deletePostAction, displayDeleted, searchExpression) {
        if (posts) {
            const filteredPosts = searchExpression
                ? posts.filter(post => matchesSomeFields(post, splitSearchExpression(searchExpression), [
                    'name', 'status'
                ]
                ))
                : posts;
            return filteredPosts
                .filter(post => displayDeleted || post.get('status') !== STATUS_DELETED)
                .valueSeq()
                .map(post => this.renderRow(post, navigate, deletePostAction));
        }
    }

    render() {
        const { posts, navigate, deletePostAction = implement => implement } = this.props;
        return (
            <div className="padding-top-2x padding-bottom-2x">
                <MetaTag title="Manage posts" />

                <Row className="margin-bottom-1x margin-top-1x">
                    <Col sm={8}>
                        <FormControl
                            placeholder="Type in to filter.."
                            onChange={this.onSeachQueryChange} />
                    </Col>
                    <Col sm={4} className="margin-top-1x margin-top-0x-sm">
                        <Button bsStyle="primary" block onClick={this.navigateToNewPost} className="pull-right">
                            <i className="fa fa-plus" /> Create Post
                </Button>
                    </Col>
                </Row>

                <h1 className="page-title">Posts</h1>


                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPosts(posts, navigate, deletePostAction, this.state.displayDeleted, this.state.searchQuery)}
                    </tbody>
                </Table>

                <Checkbox checked={this.state.displayDeleted} readOnly onClick={this.displayDeleted}>
                    Display deleted
                </Checkbox>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        posts: getSavedPosts(state)
    };
}
const mapDispatchToProps = {
    fetchPosts: fetchPostsAction.request,
    createPostAction,
    navigate: push,
    deletePostAction
};
export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);