var http = require("http");
var fs = require("fs");
let url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  // let queryData = url.parse(_url, true).query;
  const fullUrl = new URL("http://localhost:3000" + _url);

  let queryData = fullUrl.searchParams;
  let pathName = fullUrl.pathname;
  let title = queryData.get("id");
  // console.log(queryData.get("id"));

  // if (_url == "/") {
  //   title = "Welcome";
  // }
  // if (_url.indexOf("/picture/") == 0) {
  //   let imgSrc = _url.substr(1); //인덱스 1부터 끝까지
  //   fs.readFile(imgSrc, function (err, data) {
  //     response.writeHead(200, { "Content-Type": "image/jpeg" });
  //     response.end(data);
  //   });
  //   return;
  // }
  // if (_url == "/favicon.ico") {
  //   response.writeHead(404);
  //   response.end();
  //   return;
  // }
  // response.writeHead(200);
  if (pathName.indexOf("/picture/") == 0) {
    let imgSrc = pathName.substr(1); //인덱스 1부터 끝까지
    console.log(imgSrc);
    fs.readFile(imgSrc, function (err, data) {
      response.writeHead(200, { "Content-Type": "image/jpeg" });
      response.end(data);
    });
    return;
  }
  if (pathName === "/") {
    fs.readFile(`./data/${title}`, "utf8", function (err, description) {
      if (title === null) {
        title = "Welcome";
        description = "hello node.js";
      }
      let template = `
  <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ol>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
  <p>${description}
  </p>
</body>
</html>
  `;
      response.writeHead(200);
      response.end(template);
    });
  } else {
    response.writeHead(404);
    response.end("Sorry, Not found :(");
  }

  //localhost:3000/?id=     <-id=HTML하면 HTML이라는 텍스트 화면에 출력
});
console.log("server: http://localhost:3000/");
app.listen(3000);
