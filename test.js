import React from 'react';
import { renderToString } from 'react-dom/server';

import Helmet from 'react-helmet';


const comp = (
    <div>
        <Helmet>
            <title>Do it</title>
        </Helmet>
    </div>
);

const html = renderToString(comp);

const head = Helmet.renderStatic();

console.log(head.title.toString());