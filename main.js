var http = require("http");
var fs = require("fs");
let url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  const fullUrl = new URL("http://localhost:3000" + _url);
  const queryData = fullUrl.searchParams;
  const pathName = fullUrl.pathname;

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
    let title = "";
    let description = "";
    let list = "";

    if (queryData.get("id") === null) {
      //기본 페이지/ 첫화면일때
      title = "Welcome";
      description = "hello node.js";
    } else {
      //HTML, CSS, JavaScript중 선택 했을때
      title = queryData.get("id");
      description = fs.readFileSync(`./data/${title}`, "utf8");
      //fs.readFile vs fs.readFileSync,
      //fs.readFile('경로',"utf8", function(err,file){});
    }

    fs.readdir("./data", (err, files) => {
      files.forEach((file) => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
      });
      
      list = `<ul>${list}</ul>`;

      let template = `
  <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  ${list}
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
