import {createRequestTypes, action} from './';

export const RECORD = {
    ...createRequestTypes('RECORD')
};

export const fetchRecordAction = {
    request: id => action(RECORD.REQUEST, {id}),
    success: records => action(RECORD.SUCCESS, {records}),
    failure: error => action(RECORD.FAILURE, {error}),
};