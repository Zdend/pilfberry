import React, {PropTypes} from 'react';
import {SpinnerInline} from './spinner';
import {t} from 'i18next';
import moment from 'moment';
import {DATE_FORMAT} from '../constants';

const LabeledValue = ({label, value}) => (
    <div key={label}>
        <label>{label}</label>
        <p>{value}</p>
    </div>
);

const UserForm = ({user, query, ui}) => {
    const contact = query(user, 'contact');
    const record = query(user, 'record');
    return ui.get('userIsPending') ? (
        <div><SpinnerInline text="Loading User Details" /></div>
    ) : (
        <div>
            <LabeledValue label={t('common.label.login')} value={user.get('username')} />
            <LabeledValue label={t('common.label.locale')} value={user.get('locale')} />
            {contact ? (
                <div>
                    <LabeledValue label="Full Name" value={contact.get('firstName') + ' ' + contact.get('lastName')}/>
                    <LabeledValue label = "Position Title" value={contact.get('positionTitle')} />
                    <LabeledValue label="Date of Birth" value={moment(contact.get('dateOfBirth')).format(DATE_FORMAT)} />
                </div>
                ) : <div><SpinnerInline text="Loading Contact Details" /></div>
            }
            {record ? (
                <div>
                    <LabeledValue label="Position Title" value={record.get('positionTitle')} />
                    <LabeledValue label="Record Type" value={record.get('recordType')} />
                </div>
            ) : <div><SpinnerInline text="Loading Record Details" /></div>}
        </div>
    );
};

UserForm.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      locale: PropTypes.string,
      isPending: PropTypes.bool
    }).isRequired,
    query: PropTypes.func,
    ui: PropTypes.object
};


export default UserForm;
