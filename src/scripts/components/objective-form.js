import React, {Component, PropTypes} from 'react';
import {Form, Col, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {t} from 'i18next';
import ConnectedInputFactory from './connected-input-hoc';

class ObjectiveForm extends Component {
    constructor (props) {
        super(props);
        this.ConnectedInput = ConnectedInputFactory(props.inputChangeObjectiveAction);
    }

    render () {
        const {saveNewObjectiveAction, editingObjective} = this.props;
        const {ConnectedInput} = this;
        return (
            <Form horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>{t('common.label.title')}</Col>
                    <Col sm={8}><ConnectedInput field="title" value={editingObjective.get('title')} /></Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>{t('common.label.description')}</Col>
                    <Col sm={8}><ConnectedInput field="description" value={editingObjective.get('description')} /></Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>{t('common.label.type')}</Col>
                    <Col sm={8}>
                        <ConnectedInput field="type" value={editingObjective.get('type')} componentClass="select">
                            <option value="Personal">Personal</option>
                            <option value="Strategic">Strategic</option>
                            <option value="Operational">Operational</option>
                        </ConnectedInput>
                    </Col>
                </FormGroup>
                <div className="margin-top-1x margin-bottom-2x text-align-right">
                    <Button bsStyle="primary" onClick={saveNewObjectiveAction}><i className="fa fa-save margin-right-1x"/>{t('common.action.save')}</Button>
                </div>
            </Form>
        );
    }
}
ObjectiveForm.propTypes = {
    saveNewObjectiveAction: PropTypes.func.isRequired,
    inputChangeObjectiveAction: PropTypes.func.isRequired,
    editingObjective: PropTypes.object
};

export default ObjectiveForm;