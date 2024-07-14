const fs = require("fs");

// read from a file
const text = fs.readFileSync(`./name.text`, `utf-8`);

console.log(text);

// write to a file
const textOut = `This is a new text ${text}.\n Created on ${Date.now()}`;

fs.writeFileSync("./output.txt", textOut);
console.log("file written");
