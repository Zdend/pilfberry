import { Record } from 'immutable';
import { STATUS_DRAFT, POST_CATEGORY } from '../../../shared/constants';

export default Record({
    id: null,
    title: undefined,
    path: null,
    content: undefined,
    author: null,
    dateCreated: undefined,
    status: STATUS_DRAFT,
    category: POST_CATEGORY.POST,
    dateUpdated: undefined
});