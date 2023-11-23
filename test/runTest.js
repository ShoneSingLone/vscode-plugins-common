const { default: pinyin } = require("pinyin");

const target = pinyin("设置拼音风格", { style: pinyin.MODE_NORMAL });
console.log("🚀 ~ file: runTest.js:4 ~ target:", target.flat().join("_"));
