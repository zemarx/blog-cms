import React from 'react';
import PropTypes from 'prop-types';


// This class is used as a wrapper for the app to provide theming styles to components

class ThemeProvider extends React.Component {
    static propTypes = {
        theme: PropTypes.object.isRequired
    };

    static childContexTypes = {
        theme: PropTypes.object.isRequired
    };

    getChildContext () {
        const { theme } = this.props;
        return { theme };
    }

    render () {
        return React.Children.only(this.props.children);
    }
}

export default ThemeProvider;
