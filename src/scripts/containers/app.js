import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGlobalMessage, getAreaRoutes } from '../reducers/selectors';
import { setMessageAction } from '../actions/global-message-actions';

class App extends Component {
    render() {
        const { children, ...rest } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { ...rest })
        );
        return <div>{childrenWithProps}</div>;
    }
}

export default connect(state => ({
    globalMessage: getGlobalMessage(state),
    suburbs: getAreaRoutes(state)
}), {
        resetMessageAction: () => setMessageAction({ message: null })
    })(App);
