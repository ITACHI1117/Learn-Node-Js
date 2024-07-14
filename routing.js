const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

// our own modules
const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/template/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/template/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");

const dataObj = JSON.parse(data);
// learning slugify
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(slugify("Fresh Avocados", { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //   const pathname = req.url;

  //   Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" }); // you can also pass in your own headers
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardHtml);
    res.end(output);

    //  Product page
  } else if (pathname === "/product") {
    // console.log(query);
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": `application/json` });
    // res.end("<h1>Page not found</h1>");
    res.end(data);
    // not found page
  } else {
    // set headers first
    res.writeHead(404, { "Content-Type": "text/html" }); // you can also pass in your own headers
    res.end("<h1>Page not found</h1>");
  }
});

// start server
server.listen(8000, `127.0.0.1`, () => {
  console.log(`Listing to request on port 8000`);
});
