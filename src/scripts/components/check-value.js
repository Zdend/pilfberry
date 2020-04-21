import React from 'react';

export default ({ hasValue }) => <i className={`fa fa-${hasValue ? 'check text-success' : 'close text-danger'}`} />;