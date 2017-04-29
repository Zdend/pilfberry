import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchUserAction} from '../actions/user-actions';
import {
    requestObjectivesAction,
    toggleCreateObjectiveAction,
    inputChangeObjectiveAction
} from '../actions/objective-actions';
import UserForm from '../components/user-form';
import {getUser, getObjectivesWithoutNew, getUIPageUser, getNewObjective, getContacts, getRecords} from '../reducers/selectors';
import ObjectiveTable from '../components/objective-table';
import ObjectiveForm from '../components/objective-form';
import {Button} from 'react-bootstrap';
import {t} from 'i18next';
import {sessionInitialiser} from '../models';

class UserPage extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        this.props.requestUserAction('me');
        this.props.requestObjectivesAction('me');
    }
    render () {
        const {
            user,
            session,
            objectives,
            editingObjective,
            ui,
            toggleCreateObjectiveAction,
            inputChangeObjectiveAction,
            saveNewObjectiveAction
        } = this.props;
        const query = sessionInitialiser(session);
        return (
            <div>
                <h1>{t('page.user.userDetails')}</h1>
                <UserForm {...{user, query, ui}} />

                <h2>{t('page.user.objectives')}
                    <Button className="pull-right" bsStyle="default" onClick={toggleCreateObjectiveAction}>
                        <i className="fa fa-plus margin-right-1x" />{t('common.action.createObjective')}
                    </Button>
                </h2>
                {ui.get('createObjectiveOpen') ? <ObjectiveForm {...{inputChangeObjectiveAction, saveNewObjectiveAction, editingObjective}} /> : ''}
                <ObjectiveTable {...{objectives, ui}} />
            </div>
        );
    }
}

UserPage.propTypes = {
    requestUserAction: PropTypes.func.isRequired,
    requestObjectivesAction: PropTypes.func.isRequired,
    toggleCreateObjectiveAction: PropTypes.func.isRequired,
    inputChangeObjectiveAction: PropTypes.func.isRequired,
    saveNewObjectiveAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    objectives: PropTypes.object.isRequired,
    editingObjective: PropTypes.object,
    ui: PropTypes.object
};

const mapStateToProps = state => ({
    user: getUser(state),
    session: {
        contacts: getContacts(state),
        records: getRecords(state)
    },
    objectives: getObjectivesWithoutNew(state),
    editingObjective: getNewObjective(state),
    ui: getUIPageUser(state)
});

export default connect(mapStateToProps, {
    requestUserAction: fetchUserAction.request,
    requestObjectivesAction: requestObjectivesAction.request,
    saveNewObjectiveAction: requestObjectivesAction.save,
    toggleCreateObjectiveAction,
    inputChangeObjectiveAction
})(UserPage);
