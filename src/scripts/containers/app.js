import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGlobalMessage, getAreaRoutes } from '../reducers/selectors';
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

};

export default connect(state => ({
    globalMessage: getGlobalMessage(state),
    suburbs: getAreaRoutes(state)
}), {

        resetMessageAction: () => setMessageAction({ message: null }),
        navigate: push
    })(App);
