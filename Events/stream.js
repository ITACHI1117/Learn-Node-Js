const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // fs.readFile("name.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2 Streams
  // const readable = fs.createReadStream("name.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("file not found");
  // });
  const readable = fs.createReadStream("name.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening");
});
