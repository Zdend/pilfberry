import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {getActiveLanguage, getSupportedLocales} from '../reducers/selectors';
import {languageChangeAction} from '../actions/language-actions';
import {push} from 'react-router-redux';

class App extends Component {
    render () {
        const {activeLanguage, languages, languageChangeAction, navigate, children} = this.props;
        const childrenWithProps = React.Children.map(children, child => {
            return React.cloneElement(child, {activeLanguage, languages, languageChangeAction, navigate});
        });
        return <div>{childrenWithProps}</div>;
    }
}

App.propTypes = {
    activeLanguage: PropTypes.string.isRequired,
    languages: PropTypes.object.isRequired,
    languageChangeAction: PropTypes.func.isRequired
};

export default connect(state => ({
    activeLanguage: getActiveLanguage(state),
    languages: getSupportedLocales(state)
}), {
    languageChangeAction,
    navigate: push
})(App);
