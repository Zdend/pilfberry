import {Record} from 'immutable';
import User from './user';

export default Record({
    id: 'NEW',
    recordId: null,
    userId: null,
    personUpdated: new User(),
    title: '',
    description: '',
    status: null,
    type: 'Personal',
    cost: 0,
    resources: ''
});
