import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {getActiveLanguage, getSupportedLocales} from '../reducers/selectors';
import {languageChangeAction} from '../actions/language-actions';
import {push} from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500,
    },
    appBar: {
        height: 50,
    },
});


class App extends Component {
    render () {
        const {activeLanguage, languages, languageChangeAction, navigate, children} = this.props;
        const childrenWithProps = React.Children.map(children, child => {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    {React.cloneElement(child, {activeLanguage, languages, languageChangeAction, navigate})}
                </MuiThemeProvider>
            );
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
