import { createRequestTypes, action, fetchEntitiesAction, failureAction } from './';

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
export const deletePostAction = id => action(POST.DELETE_REQUEST, { id });
export const postValueChangeAction = (id, field, value) => action(POST.CHANGE, { id, field, value });

export const fetchPostsAction = fetchEntitiesAction(POSTS.REQUEST, POSTS.SUCCESS, POSTS.FAILURE);

export const savePostAction = {
    request: id => action(POST.SAVE_REQUEST, { id }),
    success: entity => action(POST.SAVE_SUCCESS, { entity }),
    failure: failureAction(POST.SAVE_FAILURE),
};

export const fetchPostAction = {
    request: ({ id, path }) => action(POST.REQUEST, { id, path }),
    success: entity => action(POST.SUCCESS, { entity }),
    failure: failureAction(POST.FAILURE),
};