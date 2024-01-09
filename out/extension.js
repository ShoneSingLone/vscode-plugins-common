const vscode = require("vscode");

const { getCommandsTranspose } = require('./shortKey/Commands/Commands.Transpose');
const { getCommandsToPinYin } = require('./shortKey/Commands/Commands.toPinYin');
const { getCommandsSplitIntoLines } = require('./shortKey/Commands/Commands.SplitIntoLines');
const { getCommandsQuoteIt, getCommandsQuoteItArray } = require('./shortKey/Commands/Commands.QuoteIt');


global.vscode = vscode;
function activate(context) {
  context.subscriptions.push(getCommandsTranspose());
  context.subscriptions.push(getCommandsSplitIntoLines());
  context.subscriptions.push(getCommandsQuoteIt());
  context.subscriptions.push(getCommandsQuoteItArray());
  context.subscriptions.push(getCommandsToPinYin());
}

exports.activate = activate;
