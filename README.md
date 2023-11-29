
- add selection to next find match
- View: Close All Editors
- View: Close Editor
- View: show Explore
- Insert Line Above
- Insert Line Below
- Search: Find in Files
- Split into Lines
- Transpose
- expandToLine 


# command

汉字转拼音

```js
"commands": [
    {
        "command": "shone.sing.lone.toPinYin",
        "title": "toPinYin"
},
{
        "command": "shone.sing.lone.transpose",
        "title": "Transpose"
    },
    {
        "command": "shone.sing.lone.splitIntoLines",
        "title": "Split into Lines"
    }
]
/* 
vscode 已经 内置
包括 Bracket Pairs => Editor>Guides:
{
    "command": "shone.sing.lone.expandToLine",
    "title": "Expand Selection to Line"
},
{
    "command": "shone.sing.lone.joinLines",
    "title": "Join Lines"
}
*/
```

- [vscode-change-case](https://github.com/wmaurer/vscode-change-case/blob/master/src/extension.ts)