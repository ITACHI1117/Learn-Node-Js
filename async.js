const fs = require("fs");
const http = require("http");

// Async read file
fs.readFile("./game.txt", "utf-8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});

console.log("read file");

fs.writeFile(
  "./textfile.txt",
  "this is a written file with asyn method",
  "utf-8",
  (err) => {
    console.log("file has been writeen");
  }
);
