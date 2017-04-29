import {Record, List, Map} from 'immutable';
import {one} from '../services/schema-services';

const UserRecord = Record({
    id: null,
    contactId: null,
    recordId: null,

    locale: 'AU',
    username: null,
    objectives: new List(),
    fullName: '',

    isPending: false,

    _entityName: 'user',
    _fields: Map({
        contactId: one('contacts', 'contact'),
        recordId: one('records', 'record')
    })
});

export default class User extends UserRecord {
    region () {
        return this.get('locale') === 'AU' ? 'Australia' : 'New Zealand';
    }
}