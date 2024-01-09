const vscode = require("vscode");
function expandToLine(
  textEditor,
  edit
) {
  let newSelections = [];
  for (let selection of textEditor.selections) {
    newSelections.push(
      new vscode.Selection(
        selection.start.with(undefined, 0),
        selection.end.with(selection.end.line + 1, 0)
      )
    );
  }
  textEditor.selections = newSelections;
}
