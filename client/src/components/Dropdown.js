// @flow

import React, { Component } from 'react';
import { Block, Col, Row } from 'jsxstyle';

import Icon from 'components/Icon';





let TODO_BOX_SHADOW_FOR_SELECT_ROOT = "0px 0px 5px #888888, -1px -1px 5px #888888, 1px -1px 5px #888888"

const SelectRoot = ({selectedItem, onMouseDown, ...props}) => (
    <Row
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        borderRadius={1}
        backgroundColor="#fff"
        box-shadow="0px 1px 4px #888888"
        hoverBackgroundColor="#dedede"

        cursor="pointer"
        {...props}
        props={{ onMouseDown: onMouseDown }}
    >
        <Block
            marginLeft={10}
            alignSelf="center">
            { selectedItem.value }
        </Block>

        <Icon
            marginLeft="auto"
            marginRight={9}
            height={10}
            width={10}
            name="arrow-down"
        />
    </Row>
);

const SelectOption = ({item, onMouseDown, selectedItem, index, ...props}) => (
    <Row
        width="100%"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        margin="3px 0"
        hoverBackgroundColor="#d4d4d4"
        //borderLeft={item.key === selectedItem.key ? '3px solid #505050' : 'none'}
        key={item.key}
        {...props}
        props={{ onMouseDown: onMouseDown }}
    >
        <Block
            textAlign="center"
            width="100%"
        >
            {item.value}
        </Block>
    </Row>
);

type Props = {
    width?: string,
    height?: string,
    items: Array<any>,
    selectedItem: Object,
    onSelect: (Object) => any
};

type State = {
    listVisible: boolean
};

class DropdownList extends Component<Props, State> {
    static defaultProps = {
        width: '50px'
    }

    constructor (props: Props) {
        super(props);

        this.state = {
            listVisible: false
        }
    }

    render () {
        return (
            <Block
            >
                <SelectRoot
                    selectedItem={this.props.selectedItem}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        this.setState({ listVisible: !this.state.listVisible });

                        // TODO: fix this, so that when option list is visible and user clicks somewhere on the screen, the list will disappear
                        // this.showList();
                        // document.addEventListener('click', this.hideList);
                    }}

                    width={this.props.width || "auto"}
                    height={this.props.height || "auto"}
                />

                {
                    this.state.listVisible && (
                        <Col
                            marginTop={5}
                            minWidth={this.props.width || "auto"}
                            position="absolute"
                            zIndex={2}
                            borderBottomLeftRadius={1}
                            borderBottomRightRadius={1}
                            boxShadow="0px 1px 4px #888888"                            
                            backgroundColor="#ffffff"
                        >
                            {
                                this.props.items.map((item, index) => {
                                    return (
                                        <SelectOption
                                            key={item.key}
                                            index={index}
                                            item={item}
                                            selectedItem={this.props.selectedItem}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                this.hideList();
                                                this.props.onSelect(item);
                                            }}
                                        />
                                    )
                                })
                            }
                        </Col>
                    )
                }
            </Block>
        )
    }

    showList = () => {
        this.setState({ listVisible: true });
        document.addEventListener('click', this.hideList);
    }

    hideList = () => {
        this.setState({ listVisible: false });
        document.removeEventListener('click', this.hideList);  
    }
}

export default DropdownList;
