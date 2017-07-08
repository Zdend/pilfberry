import { createRequestTypes, action, fetchEntitiesAction } from './';

export const POST = {
    ...createRequestTypes('POST'),
    ...createRequestTypes('POST', 'SAVE'),
    ...createRequestTypes('POST', 'DELETE'),
    CHANGE: 'POST_CHANGE',
    CREATE: 'POST_CREATE'
};
export const POSTS = {
    ...createRequestTypes('POSTS'),
};

export const createPostAction = () => action(POST.CREATE);
export const deletePostAction = id => action(POST.DELETE, { id });

export const fetchPostsAction = fetchEntitiesAction(POSTS.REQUEST, POSTS.SUCCESS, POSTS.FAILURE);