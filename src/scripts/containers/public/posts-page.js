import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getActivePosts } from '../../reducers/selectors';
import { dashRevert } from '../../../../shared/utils/string';
import MetaTag from '../../components/structure/meta';
import { fetchPostsAction } from '../../actions/post-actions';

class PostsPage extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { posts } = this.props;
        const sortedPosts = posts.sortBy(s => s.get('dateCreated'));
        return (
            <Grid>
                <MetaTag title="Restaurants in Sydney" description="Find restaurants by suburbs" />
                <Row>
                    <Col sm={12}>
                        <h1>Latest posts</h1>
                        <ul>
                            {sortedPosts.valueSeq().map(post => <li key={post.get('path')}>
                                <Link to={`/${post.get('path')}`}>{dashRevert(post.get('path'))}</Link></li>
                            )}
                        </ul>

                        <div className="margin-top-2x margin-bottom-2x"><Link to="/"><i className="fa fa-chevron-left margin-right-05x" /> Back</Link></div>
                    </Col>
                </Row>
            </Grid>

        );
    }

}


const mapStateToProps = (state) => {
    return {
        posts: getActivePosts(state)
    };
};

const mapDispatchToProps = {
    fetchPosts: fetchPostsAction.request
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);