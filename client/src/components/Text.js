// @flow

import { Inline, curry } from 'jsxstyle';
import DefaultTheme from '../styles/DefaultTheme';


const PrimaryText = curry(Inline, {
    color: DefaultTheme.primaryTextColor,
    opacity: 0.87,
    fontSize: 22
});


const SecondaryText = curry(PrimaryText, {
    opacity: 0.54,
    fontSize: 16
});



const DisabledText = curry(PrimaryText, {
    opacity: 0.38
});

export {
    PrimaryText,
    SecondaryText,
    DisabledText
}
