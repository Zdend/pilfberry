import { select, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { fetchPostsAction, fetchPostAction, savePostAction } from '../actions/post-actions';
import { fetchEntity, updateEntity, deleteEntity } from './';
import { getPost } from '../reducers/selectors';
import { setMessageAction } from '../actions/global-message-actions';

export function* fetchPosts({ criteria }) {
    yield fetchEntity(fetchPostsAction, '/api/posts', d => d, criteria);
}
export function* fetchPost({ id, path }) {
    if (id) {
        yield fetchEntity(fetchPostAction, `/api/post/${id}`);
    } else {
        yield fetchEntity(fetchPostAction, `/api/post/findByPath=${path}`);
    }
}
export function* savePost({ id }) {
    const post = yield select(getPost(id));
    yield updateEntity(savePostAction, `/api/post/${id}`, post.toJS());
    yield put(push('/secure/posts'));
    yield put(setMessageAction({ message: `Post "${post.get('title')}" was saved`, type: 'success' }));
}

export function* deletePost({ id }) {
    yield deleteEntity(savePostAction, `/api/post/${id}`);
}