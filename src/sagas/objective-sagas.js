import {takeLatest, takeEvery, select} from 'redux-saga/effects';
import {requestObjectivesAction, OBJECTIVES} from '../actions/objective-actions';
import {getNewObjective} from '../reducers/selectors';
import {fetchEntity, postEntity} from './';

function* fetchObjectives () {
    yield fetchEntity(requestObjectivesAction, '/api/developmentPlans/me', data => data.objectives);
}

export function* fetchObjectivesWatcher () {
    yield takeEvery(OBJECTIVES.REQUEST, fetchObjectives);
}

function* saveObjective () {
    const newObjective = yield select(getNewObjective);
    yield postEntity(requestObjectivesAction, '/api/objectives', {objective: newObjective.toJS()}, data => data.objectives);
}

export function* saveObjectiveWatcher () {
    yield takeLatest(OBJECTIVES.SAVE_NEW, saveObjective);
}
