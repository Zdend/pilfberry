/* @flow */
import React from 'react';
import {t} from 'i18next';

export default () => (
    <div className="padding-top-2x padding-bottom-2x">
        <div className="alert alert-success">{t('page.secure.alert.loginSuccess')}</div>
    
    </div>
);