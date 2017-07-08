import React from 'react';

export const SpinnerIcon = () => <i className="fa fa-spinner fa-spin margin-left-2x" />;
export const SpinnerInline = ({ text }) => <span>{text || 'Loading'} <SpinnerIcon /></span>;