import React from 'react';
import { EditorState, ContentState, convertFromRaw, CompositeDecorator } from 'draft-js';
import { generate } from 'shortid';
import { Link } from 'react-router-dom';

function convertTextToContent(text) {
    try {
        return convertFromRaw(JSON.parse(text));
    } catch (e) {
        return ContentState.createFromText(text || '');
    }
}

export function convertToPlainText(content) {
    const rawContentObject = convertTextToContent(content);
    return rawContentObject.getPlainText(' ');
}

export function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}
const LinkComponent = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    if (/^(https?|www)/.test(url)) {
        return (
            <a href={url} target="_blank">
                {props.children}
            </a>
        );
    }
    return (
        <Link to={url}>
            {props.children}
        </Link>
    );
};
export const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: LinkComponent,
    },
]);

export function convertText(text) {
    const rawContentObject = convertTextToContent(text);
    return EditorState.createWithContent(rawContentObject, decorator);
}

export class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}
const BLOCK_TYPES = [
    { label: <span><i className="fa fa-header" />3</span>, style: 'header-three' },
    { label: <span><i className="fa fa-header" />4</span>, style: 'header-four' },
    { label: <span><i className="fa fa-header" />5</span>, style: 'header-five' },
    { label: <span><i className="fa fa-header" />6</span>, style: 'header-six' },
    { label: <i className="fa fa-quote-right" />, style: 'blockquote' },
    { label: <i className="fa fa-list-ul" />, style: 'unordered-list-item' },
    { label: <i className="fa fa-list-ol" />, style: 'ordered-list-item' }
];
export const BlockStyleControls = (props) => {
    const { editorState, onToggle } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <span className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={generate()}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            )}
        </span>
    );
};


const INLINE_STYLES = [
    { label: <i className="fa fa-bold" />, style: 'BOLD' },
    { label: <i className="fa fa-italic" />, style: 'ITALIC' },
    { label: <i className="fa fa-underline" />, style: 'UNDERLINE' }
];
export const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <span className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={generate()}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </span>
    );
};