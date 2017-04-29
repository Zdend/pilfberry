import React from 'react';
export const SpinnerIcon = () => <i className="fa fa-spinner fa-spin margin-left-2x"></i>;
export const SpinnerInline = ({text}) => <span>{text ? text : 'Loading'} <SpinnerIcon /></span>;