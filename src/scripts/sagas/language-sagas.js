import { takeEvery, put, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { LANGUAGE, languageLoadedAction } from '../actions/language-actions';
import { changeLanguage } from 'i18next';

function languageLoadedChannel(code) {
    return eventChannel(emitter => {
        changeLanguage(code, () => emitter(END));
        return () => { };
    });
}

function* changeLanguageWorker({ code }) {
    const channel = yield call(languageLoadedChannel, code);
    yield put(languageLoadedAction());
    yield take(channel);
}

export function* changeLanguageWatcher() {
    yield takeEvery(LANGUAGE.CHANGE, changeLanguageWorker);
}