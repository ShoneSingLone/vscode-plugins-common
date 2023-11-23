"use strict";
const vscode = require("vscode");
const helperFunctions_1 = require("./helperFunctions");
// Commands
// ========
function transposeCharacters(textEditor, edit) {
    const document = textEditor.document;
    textEditor.selections.forEach((selection) => {
        let p = new vscode.Position(selection.active.line, selection.active.character);
        let nextPosition = (0, helperFunctions_1.getNext)(p, document);
        if (nextPosition == null) {
            nextPosition = p;
            //@ts-ignore
            p = (0, helperFunctions_1.getPrev)(p, document);
        }
        let prevPosition = (0, helperFunctions_1.getPrev)(p, document);
        if (prevPosition == null) {
            return;
        }
        let nextSelection = new vscode.Selection(p, nextPosition);
        let nextChar = textEditor.document.getText(nextSelection);
        edit.delete(nextSelection);
        edit.insert(prevPosition, nextChar);
    });
}
exports.transposeCharacters = transposeCharacters;
function transposeSelections(textEditor, edit) {
    const selectionText = textEditor.selections.map((selection) => {
        return textEditor.document.getText(selection);
    });
    // Transpose
    selectionText.unshift(selectionText.pop());
    for (let i = 0; i < selectionText.length; i++) {
        edit.replace(textEditor.selections[i], selectionText[i]);
    }
}
exports.transposeSelections = transposeSelections;
function transpose(textEditor, edit) {
    if (textEditor.selections.every((s) => s.isEmpty)) {
        transposeCharacters(textEditor, edit);
    }
    else {
        transposeSelections(textEditor, edit);
    }
}
exports.transpose = transpose;
function splitIntoLines(textEditor, edit) {
    let newSelections = [];
    for (let selection of textEditor.selections) {
        if (selection.isSingleLine) {
            newSelections.push(selection);
            continue;
        }
        let line = textEditor.document.lineAt(selection.start);
        newSelections.push(new vscode.Selection(selection.start, line.range.end));
        for (let lineNum = selection.start.line + 1; lineNum < selection.end.line; lineNum++) {
            line = textEditor.document.lineAt(lineNum);
            newSelections.push(new vscode.Selection(line.range.start, line.range.end));
        }
        if (selection.end.character > 0) {
            newSelections.push(new vscode.Selection(selection.end.with(undefined, 0), selection.end));
        }
    }
    textEditor.selections = newSelections;
}
exports.splitIntoLines = splitIntoLines;
function expandToLine(textEditor, edit) {
    let newSelections = [];
    for (let selection of textEditor.selections) {
        newSelections.push(new vscode.Selection(selection.start.with(undefined, 0), selection.end.with(selection.end.line + 1, 0)));
    }
    textEditor.selections = newSelections;
}
exports.expandToLine = expandToLine;
function joinLines(textEditor, edit) {
    const document = textEditor.document;
    let newSelections = [];
    for (const selection of textEditor.selections) {
        if (selection.isEmpty) {
            const range = (0, helperFunctions_1.joinLineWithNext)(selection.start.line, edit, document);
            if (range) {
                newSelections.push(new vscode.Selection(range.end, range.end));
            }
            else {
                newSelections.push(selection);
            }
        }
        else {
            for (let lineNum = selection.start.line; lineNum <= selection.end.line; lineNum++) {
                (0, helperFunctions_1.joinLineWithNext)(lineNum, edit, document);
            }
            newSelections.push(selection);
        }
    }
    textEditor.selections = newSelections;
}
exports.joinLines = joinLines;