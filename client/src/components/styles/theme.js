import React from 'react';
import PropTypes from 'prop-types';


const connectTheme = Component => {
    return (Component) => {
        const UiComponent = (props, context) => {
            const { theme } = context;

            return <Component theme={theme} {...props}/>
        };

        UiComponent.contextTypes = {
            theme: PropTypes.object.isRequired,
        };

        return UiComponent;
    }
};

export default connectTheme;
