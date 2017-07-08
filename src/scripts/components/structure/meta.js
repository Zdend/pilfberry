/* global window */
import React from 'react';
import { getTitle, getDescription, getKeywords } from '../../../../shared/constants/keywords';
import { HOSTNAME } from '../../../../shared/constants';
import Helmet from 'react-helmet';

export default ({ title, description, keywords, image, url, social }) => {
    const imageUrl = image ? `${HOSTNAME}${image}` : `${HOSTNAME}/static/images/Burger.jpg`;
    return (
        <Helmet>
            <title>{getTitle(title)}</title>
            <meta name="description" content={getDescription(description)} />
            <meta name="keywords" content={getKeywords(keywords)} />

            {social && <meta property="og:url" content={url} />}
            {social && <meta property="og:type" content="website" />}
            {social && <meta property="og:title" content={getTitle(title)} />}
            {social && <meta property="og:site_name" content="Pilfberry" />}
            {social && <meta property="og:description" content={getDescription(description)} />}
            {social && <meta property="og:locale" content="en_AU" />}
            {social && <meta property="og:image" content={imageUrl} />}

        </Helmet>
    );
};