
import React, { Component } from 'react';
import { Row, Block } from 'jsxstyle';

const colors = [
    // '#191919', '#3B3738', '#161616', '#000000',
    // '#2B2B2B', '#404040', '#585858', '#191919',
    '#C63D0F', '#DE1B1B', '#FF4136', '#B22222',
    // '#7D1935', '#B71427', '#FF0000', '#E44424',
    // '#9370DB', '#B10DC9', '#FF69B4', '#FFC0CB',
    // '#FFD700', '#DAA520', '#D9853B', '#FF851B',
    '#FFA500', '#FF9009', '#FF8C00', '#FF7F50',
    // '#FFF056', '#FFDC00', '#FFE658', '#F3FAB6',
    // '#005A31', '#A8CD1B', '#CBE32D', '#ADFF2F',
    '#3D9970', '#2ECC40', '#00FF00', '#118C4E',
    // '#228B22', '#E9E581', '#C1E1A6', '#A2AB58',
    // '#00008B', '#4A96AD', '#6DBDD6', '#67BCDB',
    '#191970', '#0074D9', '#7FDBFF', '#39CCCC',
    // '#AAAAAA', '#DDDDDD', '#DFE2DB', '#ECECEA',
    // '#FDF3E7', '#FEFBEC', '#F6F6F6', '#FFFFFF',
    // '#FAEBD7', '#F5F5F5', '#F8F8FF', '#FFFAF0'
];

let colorStyleMap = {};

// Init colors map
colors.map(colorHex => {
    colorStyleMap[`color-${colorHex}`] = { color: colorHex };
});

class ColorPicker extends Component {

    constructor (props) {
        super(props);

        this.onColorPick = this.onColorPick.bind(this);
    }

    onColorPick (event, color) {
        event.preventDefault();

        this.props.onToggle(color)
    }

    render () {
        return (
            <Row
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                border={'1px solid black'}
                width={100}>
                {
                    colors.map(color => (
                        <Block
                            key={color}
                            cursor="pointer"
                            margin={2}
                            width={20}
                            height={20}
                            backgroundColor={color}
                            props={{ onMouseDown: (event) => this.onColorPick(event, color) }}
                        />
                    ))
                }
            </Row>
        );
    }
}


export {
    ColorPicker,
    colors,
    colorStyleMap
}
