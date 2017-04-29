/* @flow */
import React from 'react';
import {t} from 'i18next';

export default () => (
    <div>
        <div className="alert alert-success">{t('page.secure.alert.loginSuccess')}</div>
        <div>{t('key1')}</div>
    </div>
);