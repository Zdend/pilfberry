import React from 'react';
import {Table} from 'react-bootstrap';
import {t} from 'i18next';
import {SpinnerInline} from './spinner';

const ObjectivesBody = objectives => objectives.entrySeq().map(([id, objective]) =>
        <tr key={id}>
            <td>{objective.get('title')}</td>
            <td>{objective.get('description')}</td>
            <td>{objective.get('type')}</td>
        </tr>);


export default ({objectives, ui}) => (
    <Table striped bordered condensed hover>
        <thead>
            <tr>
                <th>{t('common.header.title')}</th>
                <th>{t('common.header.description')}</th>
                <th>{t('common.header.type')}</th>
            </tr>
        </thead>
        <tbody>
        {ui.get('objectivesIsPending') ? (<tr><td colSpan={3}><SpinnerInline /></td></tr>) : ObjectivesBody(objectives)}
        </tbody>
    </Table>
);

