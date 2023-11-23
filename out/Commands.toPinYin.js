const { default: pinyin } = require("pinyin");
function toPinYin(textEditor, edit) {
    try {
        const selection = textEditor.selections[0];
        const selectionText = textEditor.document.getText(selection);
        const target = pinyin(selectionText, { style: pinyin.MODE_NORMAL });
        edit.replace(selection, target.flat().join("_"));
    } catch (error) {
        console.error(error);
    }
}
exports.toPinYin = toPinYin;