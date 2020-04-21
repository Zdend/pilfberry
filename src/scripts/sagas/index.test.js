import 'babel-polyfill';
import { call, put } from 'redux-saga/effects';
import { get } from 'axios';
import { fetchEntity } from './';

describe('ESS-PROTO', () => {

    const actionCreatorObject = {
        success: data => ({ type: 'ACTION_SUCCESS', data }),
        failure: error => ({ type: 'ACTION_FAILURE', error })
    };
    const path = '/api/dummy';

    describe('Saga - fetchEntity - failure', () => {
        const generator = fetchEntity(actionCreatorObject, path);

        it('calls get request', () => {
            expect(generator.next().value).to.deep.equal(call(get, path));
        });

        it('dispatches a failure action', () => {
            expect(generator.next().value).to.deep.equal(put({ type: 'ACTION_FAILURE', error: undefined }));
        });
    });


    describe('Saga - fetchEntity - success', () => {
        const generator = fetchEntity(actionCreatorObject, path, data => data.users[0]);
        const user = { id: '123', name: 'Frankie Au' };

        it('calls get request', () => {
            expect(generator.next().value).to.deep.equal(call(get, path));
        });

        it('dispatches a success action', () => {
            expect(generator.next({
                data: {
                    users: [user]
                }
            }).value).to.deep.equal(put({ type: 'ACTION_SUCCESS', data: user }));
        });
    });
});