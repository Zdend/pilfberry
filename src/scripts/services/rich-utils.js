import { EditorState, ContentState, convertFromRaw } from 'draft-js';

export function convertText(text) {
    let rawContentObject;
    try {
        rawContentObject = convertFromRaw(JSON.parse(text));
    } catch (e) {
        rawContentObject = ContentState.createFromText(text || '');
    }

    return EditorState.createWithContent(rawContentObject);
}

export function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}