import {fork, call, put} from 'redux-saga/effects';
import {requestLoginWatcher} from './login-sagas';
import {fetchUserWatcher} from './user-sagas';
import {changeLanguageWatcher} from './language-sagas';
import {fetchObjectivesWatcher, saveObjectiveWatcher} from './objective-sagas';
import {get, post} from 'axios';

export function* fetchEntity({success, failure}, path, resultTransformer = data => data) {
    const response = yield call(get, path);
    if (response) {
        yield put(success(resultTransformer(response.data)));
    } else {
        yield put(failure(response));
    }
}

export function* postEntity({success, failure}, path, payload, resultTransformer = data => data) {
    const response = yield call(post, path, payload);
    if (response) {
        yield put(success(resultTransformer(response.data)));
    } else {
        yield put(failure(response));
    }
}

export default function* root () {
    yield [
        fork(requestLoginWatcher),
        fork(fetchObjectivesWatcher),
        fork(saveObjectiveWatcher),
        fork(fetchUserWatcher),
        fork(changeLanguageWatcher)
    ];
}