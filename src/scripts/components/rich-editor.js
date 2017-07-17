import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Editor, RichUtils, convertToRaw, EditorState } from 'draft-js';
import { generate } from 'shortid';
import { Overlay, Popover, Button, InputGroup, FormControl } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
import { getSelectionEntity } from 'draftjs-utils';
import { convertText, getBlockStyle, BlockStyleControls, InlineStyleControls, StyleButton } from '../services/rich-utils';

export default class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: convertText(props.value),
            showURLInput: false,
            urlValue: ''
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.onAffix = this.onAffix.bind(this);
        this.onAffixedOff = this.onAffixedOff.bind(this);

        this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
        this.dismissLinkPopover = this.dismissLinkPopover.bind(this);
    }
    onChange(editorState) {
        this.setState({ editorState });
    }

    onBlur(editorState) {
        this.props.changeAction(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    _promptForLink() {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        let stateChanges = {};
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            const url = linkKey ? contentState.getEntity(linkKey).getData().url : '';
            stateChanges = {
                urlValue: url
            };
        }
        this.setState(prevState => ({
            ...stateChanges,
            showURLInput: !prevState.showURLInput
        }), () => {
            setTimeout(() => findDOMNode(this.linkStyleControls.urlInput).focus(), 0);
        });
    }
    _confirmLink() {
        const { editorState, urlValue } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            showURLInput: false,
            urlValue: ''
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }
    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }
    _removeLink(e) {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
                showURLInput: false,
                urlValue: ''
            });
        }
    }
    dismissLinkPopover() {
        this.setState({
            showURLInput: false
        });
    }
    onAffix() {
        this.setState({ affixed: true });
    }
    onAffixedOff() {
        this.setState({ affixed: false });
    }


    render() {
        const { editorState, showURLInput, urlValue, affixed } = this.state;
        const { placeholder } = this.props;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                <AutoAffix viewportOffsetTop={0} container={this} onAffix={this.onAffix} onAffixedTop={this.onAffixedOff}>
                    <div className="RichEditor-controls__container">
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={this.toggleBlockType}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={this.toggleInlineStyle}
                        />
                        <LinkStyleControls
                            editorState={editorState}
                            onURLChange={this.onURLChange}
                            urlValue={urlValue}
                            showURLInput={showURLInput}
                            onLinkInputKeyDown={this.onLinkInputKeyDown}
                            confirmLink={this.confirmLink}
                            removeLink={this.removeLink}
                            promptForLink={this.promptForLink}
                            affixed={affixed}
                            dismissLinkPopover={this.dismissLinkPopover}
                            ref={ref => this.linkStyleControls = ref}
                        />
                    </div>
                </AutoAffix>
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onTab={this.onTab}
                        onFocus={this.onFocus}
                        placeholder={placeholder}
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

class LinkStyleControls extends Component {
    constructor() {
        super();
        this.state = {
            showOptions: false
        };
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(e) {
        this.props.promptForLink();
    }

    render() {
        const { editorState, onURLChange, urlValue, onLinkInputKeyDown, confirmLink, removeLink, dismissLinkPopover, showURLInput, affixed } = this.props;

        const contentState = editorState.getCurrentContent();
        const entityKey = getSelectionEntity(editorState);
        const entity = entityKey ? contentState.getEntity(entityKey) : false;
        const active = entity ? entity.getType('LINK') : false;

        return (
            <span className="RichEditor-controls">
                <StyleButton
                    label={<i className="fa fa-link" />}
                    key={generate()}
                    active={active}
                    onToggle={this.onToggle}
                    ref={ref => this.linkButton = ref}
                />
                <Overlay trigger="click" placement="bottom" show={showURLInput} target={() => this.linkButton}>
                    <Popover id={generate()} title={<span>Link <Button className="close" onClick={dismissLinkPopover}>&times;</Button></span>} className={`${affixed ? 'RichEditor-popover--affixed' : ''}`}>
                        
                        <InputGroup>
                            <FormControl
                                onChange={onURLChange}
                                ref={ref => this.urlInput = ref}
                                type="text"
                                value={urlValue}
                                onKeyDown={onLinkInputKeyDown}
                            />
                            <InputGroup.Button>
                                <Button onClick={removeLink} bsStyle="danger">
                                    <i className="fa fa-close" />
                                </Button>
                                <Button onClick={confirmLink} bsStyle="primary">
                                    <i className="fa fa-check" />
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Popover>
                </Overlay>
            </span>

        );
    }
}