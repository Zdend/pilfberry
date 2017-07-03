import { EditorState, ContentState, convertFromRaw } from 'draft-js';

function convertTextToContent(text) {
    try {
        return convertFromRaw(JSON.parse(text));
    } catch (e) {
        return ContentState.createFromText(text || '');
    }
}

export function convertText(text) {
    const rawContentObject = convertTextToContent(text);

    return EditorState.createWithContent(rawContentObject);
}

export function convertToPlainText(content) {
    const rawContentObject = convertTextToContent(content);
    return rawContentObject.getPlainText();
}

export function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}