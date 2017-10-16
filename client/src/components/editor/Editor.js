// @flow

import React from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { Block, Row, Col, Inline } from 'jsxstyle';

import HeadingOptions from './HeadingOptions';
import FontFamilyOptions, { fontFamilyStyleMap } from './FontFamilyOptions';
import FontSizeOptions, { fontSizeStyleMap } from './FontSizeOptions';
import TextWeightOptions from './TextWeightOptions';
import TextListOptions from './TextListOptions';
import { colorStyleMap, ColorPicker } from './ColorPicker';
import Icon from 'components/Icon';

import './EditorStyles.css';

// Combine style maps
const styleMap = {...colorStyleMap, ...fontSizeStyleMap, ...fontFamilyStyleMap};


type Props = {
    editorState: any, // TODO:
    onChange: (any) => any // TODO:
};

type State = {

};


class CustomEditor extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Col minHeight="350px" border="1px #dedede solid">

                <Row
                    padding="10px 6px 10px 6px"
                    borderBottom="1px solid #d1d1d1"
                    alignItems="center"
                    alignContent="space-between"
                >
                    {/* Text weight */}
                    <TextWeightOptions editorState={this.props.editorState} onToggle={this.toggleInlineStyle} />

                    {/* Text type/headings */}
                    <HeadingOptions editorState={this.props.editorState} onToggle={this.toggleBlockType} />

                    {/* Text font */}
                    {/* <FontFamilyOptions editorState={this.props.editorState} onToggle={this.setFontSize}/> */}

                    {/* Text size */}
                    <FontSizeOptions editorState={this.props.editorState} onToggle={this.setFontSize} />

                    {/* List options */}
                    <TextListOptions editorState={this.props.editorState} onToggle={this.toggleBlockType} />

                    {/* Image adding */}

                    {/* Undo - Redo */}

                    <Row
                        margin="0 3px"
                        alignItems="center"
                        height={28}
                        borderRadius={3}
                        boxShadow="0px 1px 4px #888888"
                        padding="0 6px"
                        props={{
                            onClick: () => {
                                const { editorState } = this.props;
                                this.props.onChange(EditorState.undo(editorState))
                            }
                        }}
                    >
                        <Icon
                            marginRight={0}
                            cursor="pointer"
                            name="undo"
                        />
                    </Row>

                    <Row
                        margin="0 3px"
                        alignItems="center"
                        justifyContent="center"
                        height={28}
                        borderRadius={3}                        
                        boxShadow="0px 1px 4px #888888"
                        padding="0 6px"
                        props={{
                            onClick: () => {
                                const { editorState } = this.props;
                                this.props.onChange(EditorState.redo(editorState))
                            }
                        }}
                    >
                        <Icon
                            marginRight={0}
                            cursor="pointer"
                            name="redo"
                        />
                    </Row>

                </Row>
                
                {/* <BlockStyleControls editorState={this.props.editorState} onToggle={this.toggleBlockType} /> */}

                {/* <ColorPicker editorState={this.props.editorState} onToggle={this.toggleColor} /> */}

                <Editor
                    customStyleMap={styleMap}
                    blockStyleFn={this.getBlockStyle}
                    handleKeyCommand={this.handleKeyCommand}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                    placeholder={'Hello'}
                />



            </Col>
        )
    }

    getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote': {
                return 'RichEditor-blockquote';
            }
            default: {
                return null;
            }
        }
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command);

        if (newState) {
            this.props.onChange(newState);
            return true;
        }

        return false;
    }

    toggleBlockType = (blockType: string) => {
        this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
    }

    toggleInlineStyle = (inlineStyle: string) => {
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
    }

    toggleColor = (toggledColor: string) => {
        // TODO: check that it works properly
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'color-' + toggledColor));
    }

    setFontSize = (toggledFontSize: number) => {
        const { editorState } = this.props;
        const selection = editorState.getSelection();

        // Allow only one font size at a time. Turn off all active font sizes.
        const nextContentState = Object.keys(fontSizeStyleMap)
          .reduce((contentState, fontSize) => {
            return Modifier.removeInlineStyle(contentState, selection, fontSize)
          }, editorState.getCurrentContent());

        const nextEditorState = EditorState.push(
          editorState,
          nextContentState,
          'change-inline-style'
        );

        this.props.onChange(RichUtils.toggleInlineStyle(nextEditorState, toggledFontSize));
    }
}


export default CustomEditor;
