import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getActiveLanguage, getSupportedLocales, getGlobalMessage } from '../reducers/selectors';
import { languageChangeAction } from '../actions/language-actions';
import { setMessageAction } from '../actions/global-message-actions';
import { push } from 'react-router-redux';

class App extends Component {
    render() {
        const { children, ...rest } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { ...rest })
        );
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
    languages: getSupportedLocales(state),
    globalMessage: getGlobalMessage(state)
}), {
        languageChangeAction,
        resetMessageAction: setMessageAction({ message: null }),
        navigate: push
    })(App);
