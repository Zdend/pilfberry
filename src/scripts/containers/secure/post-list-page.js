import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Checkbox, FormControl } from 'react-bootstrap';
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
    }
    componentDidMount() {
        // this.props.fetchPosts();
        this.navigateToNewPost = () => this.props.navigate(`/secure/posts/${NEW_ID}`);
    }

    // displayDeleted(e) {
    //     const displayDeleted = e.target.checked;
    //     this.setState({ displayDeleted }, () => this.props.fetchPosts({ status: displayDeleted ? STATUS_DELETED : STATUS_ACTIVE }));
    // }

    onSeachQueryChange(e) {
        this.setState({ searchQuery: e.target.value });
    }

    renderRow(post, navigate, deletePostAction) {
        const id = post.get('id');

        return (
            <tr key={id} className="clickable" onClick={() => navigate(`/secure/posts/${id}`)}>
                <td>{post.get('title')}</td>

                <td>{post.get('status')}</td>
                <td>
                    {post.get('status') === STATUS_ACTIVE &&
                        <Button
                            bsSize="xs"
                            bsStyle="danger"
                            className="margin-right-05x margin-bottom-05x"
                            onClick={() => deletePostAction(id)}>
                            Delete
                        </Button>
                    }
                </td>
            </tr>
        );
    }

    renderRestaurants(posts, navigate, deletePostAction, displayDeleted, searchExpression) {
        if (posts) {
            const filteredPosts = searchExpression
                ? posts.filter(post => matchesSomeFields(post, splitSearchExpression(searchExpression), [
                    'name', 'status'
                ]
                ))
                : posts;
            return filteredPosts
                .filter(post => displayDeleted || post.get('status') === STATUS_ACTIVE)
                .valueSeq()
                .map(post => this.renderRow(post, navigate, deletePostAction));
        }
    }

    render() {
        const { posts, navigate, deletePostAction = implement => implement } = this.props;
        return (
            <div className="padding-bottom-2x">
                <MetaTag title="Manage posts" />
                <FormControl
                    className="margin-bottom-1x margin-top-1x"
                    placeholder="Type in to filter.."
                    onChange={this.onSeachQueryChange} />

                <Button bsStyle="primary" onClick={this.navigateToNewPost} className="pull-right">
                    <i className="fa fa-plus" /> Create Post
                </Button>
                <h1>Posts</h1>


                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRestaurants(posts, navigate, deletePostAction, this.state.displayDeleted, this.state.searchQuery)}
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
    fetchRestaurants: fetchPostsAction.request,
    createPostAction,
    navigate: push,
    // deletePostAction
};
export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);