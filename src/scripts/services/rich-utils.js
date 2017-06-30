import { EditorState, ContentState, convertFromRaw, convertFromHTML } from 'draft-js';

export function convertText(text) {
    let rawContentObject;
    try {
        rawContentObject = convertFromRaw(JSON.parse(text));
    } catch (e) {
        const blocksFromHTML = convertFromHTML(text);
        rawContentObject = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
    }

    return EditorState.createWithContent(rawContentObject);
}

export function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}