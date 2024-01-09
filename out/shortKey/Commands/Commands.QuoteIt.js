const vscode = require("vscode");

function quoteItArray(textEditor, edit) {
  return quoteIt(textEditor, edit, true);
}
function quoteIt(textEditor, edit, isArray = false) {
  /* 获取选中的文本内容，如果为空，就获取当前光标位置的文本内容 */

  const document = textEditor.document;
  textEditor.selections.forEach((selection /* : vscode.Selection */) => {
    const sourceCode = document.getText(selection);
    let selectionPosition = new vscode.Position(
      selection.active.line,
      selection.active.character
    );

    const targetCode = transIt(sourceCode, isArray);
    /* 删除已选择的字符 */
    edit.delete(selection);
    /* 插入新生成的字符 */
    edit.insert(selectionPosition, targetCode);
  });
}

function transIt(code, isArray = false) {
  let lines = code.split("\r\n");
  lines = lines.filter((i) => !!i);

  for (let i = 0; i < lines.length; i++) {
    addQuote(i);
  }

  /* 用数组的join方法，将数组中的字符连接成一个字符串 */
  if (isArray) {
    return `[${lines.map((i) => `"${i}"`).join(",\r\n")}].join("");`;
  } else {
    /* 用+连接字符串 */
    return `${lines.map((i) => `"${i}"`).join(`+\r\n`)};`;
  }

  function addQuote(i) {
    const contentString = JSON.stringify([lines[i]]);
    const { length } = contentString;
    lines[i] = contentString.substring(2, length - 2);
  }
}

function getCommandsQuoteIt() {
  return vscode.commands.registerTextEditorCommand(
    "shone.sing.lone.QuoteIt",
    quoteIt
  );
}
function getCommandsQuoteItArray() {
  return vscode.commands.registerTextEditorCommand(
    "shone.sing.lone.QuoteIt.Array",
    quoteItArray
  );
}

exports.getCommandsQuoteIt = getCommandsQuoteIt;
exports.getCommandsQuoteItArray = getCommandsQuoteItArray;
