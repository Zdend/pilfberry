import React from 'react';
import { getTitle, getDescription, getKeywords } from '../../../../shared/constants/keywords';
import Helmet from 'react-helmet';

export default ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{getTitle(title)}</title>
            <meta name="description" content={getDescription(description)} />
            <meta name="keywords" content={getKeywords(keywords)} />
        </Helmet>
    );
};