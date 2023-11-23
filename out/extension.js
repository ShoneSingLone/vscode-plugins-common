"use strict";
const vscode = require("vscode");
const { transpose, splitIntoLines } = require("./Commands");
const { toPinYin } = require("./Commands.toPinYin");
// Activate
function activate(context) {
    const commandsTranspose = vscode.commands.registerTextEditorCommand("shone.sing.lone.transpose", transpose);
    context.subscriptions.push(commandsTranspose);

    const commandsSplitIntoLines = vscode.commands.registerTextEditorCommand("shone.sing.lone.splitIntoLines", splitIntoLines);
    context.subscriptions.push(commandsSplitIntoLines);

    const commandsToPinYin = vscode.commands.registerTextEditorCommand("shone.sing.lone.toPinYin", toPinYin);
    context.subscriptions.push(commandsToPinYin);
}
exports.activate = activate;