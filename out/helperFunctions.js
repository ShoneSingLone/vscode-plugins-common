"use strict";
//@ts-nocheck
const vscode = require("vscode");
// helperFunctions
// ================
function getNext(position, document) {
    const endOfLine = document.lineAt(position.line).range.end.character;
    if (position.character != endOfLine) {
        return new vscode.Position(position.line, position.character + 1);
    }
    if (position.line == document.lineCount - 1) {
        return null;
    }
    return new vscode.Position(position.line + 1, 0);
}
exports.getNext = getNext;
function getPrev(position, document) {
    if (position.character != 0) {
        return new vscode.Position(position.line, position.character - 1);
    }
    if (position.line == 0) {
        return null;
    }
    const endOfPrevLine = document.lineAt(position.line - 1).range.end.character;
    return new vscode.Position(position.line - 1, endOfPrevLine);
}
exports.getPrev = getPrev;
/** Returns the range deleted, if successful */
function joinLineWithNext(line, edit, document) {
    if (line >= document.lineCount - 1)
        return null;
    const matchWhitespaceAtEnd = document.lineAt(line).text.match(/\s*$/) || [];
    const range = new vscode.Range(
        //@ts-ignore
        line, document.lineAt(line).range.end.character -
    matchWhitespaceAtEnd?.[0].length, line + 1, document.lineAt(line + 1).firstNonWhitespaceCharacterIndex);
    edit.replace(range, " ");
    return range;
}
exports.joinLineWithNext = joinLineWithNext;