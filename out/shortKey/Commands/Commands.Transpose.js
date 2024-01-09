const { getNext, getPrev } = require("../helperFunctions");
function transposeCharacters(textEditor, edit) {
  const document = textEditor.document;
  textEditor.selections.forEach((selection) => {
    let p = new vscode.Position(
      selection.active.line,
      selection.active.character
    );
    let nextPosition = getNext(p, document);
    if (nextPosition == null) {
      nextPosition = p;
      //@ts-ignore
      p = getPrev(p, document);
    }
    let prevPosition = getPrev(p, document);
    if (prevPosition == null) {
      return;
    }
    let nextSelection = new vscode.Selection(p, nextPosition);
    let nextChar = textEditor.document.getText(nextSelection);
    edit.delete(nextSelection);
    edit.insert(prevPosition, nextChar);
  });
}

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

function transpose(textEditor, edit) {
  if (textEditor.selections.every((s) => s.isEmpty)) {
    /* 光标，字母 */
    transposeCharacters(textEditor, edit);
  } else {
    /* 选中的文字 */
    transposeSelections(textEditor, edit);
  }
}

function getCommandsTranspose() {
  return vscode.commands.registerTextEditorCommand(
    "shone.sing.lone.transpose",
    transpose
  );
}

exports.transposeCharacters = transposeCharacters;
exports.transposeSelections = transposeSelections;
exports.transpose = transpose;
exports.getCommandsTranspose = getCommandsTranspose;
