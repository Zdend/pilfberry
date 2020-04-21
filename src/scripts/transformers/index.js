import { fromJS } from 'immutable';

export function reviveServerState(state) {
    try {
        delete state.ui.pages.landingPage;
    } catch (e) {
        // Particular state wasn't provided
    }
    return fromJS(state);
}