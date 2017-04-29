import {createRequestTypes, action} from './';

export const OBJECTIVES = {
    ...createRequestTypes('OBJECTIVES'),
    TOGGLE_CREATE: 'OBJECTIVES_TOGGLE_CREATE',
    INPUT_CHANGE: 'OBJECTIVES_INPUT_CHANGE',
    SAVE_NEW: 'OBJECTIVES_SAVE_NEW',
};

export const toggleCreateObjectiveAction = () => action(OBJECTIVES.TOGGLE_CREATE);
export const inputChangeObjectiveAction = (key, e) => action(OBJECTIVES.INPUT_CHANGE, { newState: { [key]: e.target.value }});


export const requestObjectivesAction = {
    save: () => action(OBJECTIVES.SAVE_NEW),
    request: () => action(OBJECTIVES.REQUEST),
    success: (objectives) => action(OBJECTIVES.SUCCESS, {objectives}),
    failure: (error) => action(OBJECTIVES.FAILURE, {error}),
};

