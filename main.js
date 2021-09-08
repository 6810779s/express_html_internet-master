var http = require('http');
var fs = require('fs');
let url = require('url');
let qs = require('querystring');
let path = require('path');
let sanitizeHtml = require('sanitize-html');

const template = require('./lib/template.js');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  const fullUrl = new URL('http://localhodst:3000' + _url);
  const queryData = fullUrl.searchParams;
  const pathName = fullUrl.pathname;
  // console.log('security', path.parse(pathName));
  const security = path.parse(pathName).base;

  if (pathName.indexOf('/picture/') == 0) {
    console.log(security);
    // let imgSrc = pathName.substr(1); //인덱스 1부터 끝까지
    fs.readFile(`picture/${security}`, function (err, data) {
      response.writeHead(200, { 'Content-Type': 'image/jpeg' });
      response.end(data);
    });
    return;
  }

  if (pathName === '/') {
    let title = '';
    let description = '';
    let list = '';
    let body = '';
    let control = '';
    let sanitizedTitle = '';
    let sanitizedHtml = '';

    if (queryData.get('id') === null) {
      //기본 페이지/ 첫화면일때
      title = 'Welcome';
      description = 'hello node.js';
      control = `<a href="/create">create</a>`;
    } else {
      //HTML, CSS, JavaScript중 선택 했을때
      title = queryData.get('id');
      console.log(title);
      let securityTitle = path.parse(title).base;
      description = fs.readFileSync(`./data/${securityTitle}`, 'utf8');
      sanitizedTitle = sanitizeHtml(title, { allowedTags: ['b', 'h1', 'h2'] });
      sanitizedHtml = sanitizeHtml(description, {
        allowedTags: ['b', 'h1', 'h2 '],
      });
      control = `<a href="/create">create</a>
      <a href="/update?id=${sanitizedTitle}">update</a>
      <form action="/process_delete" method="post">
        <input type="hidden" name="id" value="${sanitizedTitle}">
        <input type="submit" value="delete">
      </form>
      `;
      //fs.readFile vs fs.readFileSync,
      //fs.readFile('경로',"utf8", function(err,file){});
    }

    fs.readdir('./data', (err, files) => {
      list = template.list(files, list);
      body = `<h2>${sanitizedTitle}</h2>${sanitizedHtml}`;

      let HTML = template.html(title, list, body, control);
      response.writeHead(200);
      response.end(HTML);
    });
  } else if (pathName === '/create') {
    let title = 'Web-Create';
    let list = '';
    fs.readdir('./data', (err, files) => {
      list += template.list(files, list);

      let body = `
        <form action="/process_create" method="post">
          <p>
            <input type="text" name="title" placeholder="title">
          </p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `;

      let HTML = template.html(title, list, body, '');
      response.writeHead(200);
      response.end(HTML);
    });
  } else if (pathName === '/process_create') {
    let body = '';

    //post로 데이터 전송할 경우, 전송할 데이터가 많을경우를 대비하는 함수
    request.on('data', function (data) {
      body += data;

      //데이터제한 코드
      if (body.length > 1e6) {
        request.connection.destroy();
      }
    });

    //들어올 정보가 없을때 실행하는 함수
    request.on('end', function () {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;

      //fs.writeFile(경로 및 지정할 이름, 내용, ..., callback함수)
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathName === '/update') {
    //원래 있는 값들

    let title = queryData.get('id');
    let securityTitle = path.parse(title).base;

    let description = fs.readFileSync(`./data/${securityTitle}`, 'utf8');
    let list = '';
    let body = '';
    let control = `<a href="/create">create</a>
    <a href="/update?id=${title}">update</a>`;

    fs.readdir('./data', (err, files) => {
      list = template.list(files, list);

      body = `<form action="/process_update" method="post">
      <input type="hidden" name="id" value="${title}">
      <p>
        <input type="text" name="title" placeholder="title" value="${title}">
      </p>
      <p>
        <textarea name="description" placeholder="description">${description}</textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>`;

      let HTML = template.html(title, list, body, control);
      response.writeHead(200);
      response.end(HTML);
    });
  } else if (pathName === '/process_update') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathName === '/process_delete') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      let post = qs.parse(body);
      let id = post.id;
      let securityId = path.parse(id).base;
      // console.log('id', id);
      fs.unlink(`data/${securityId}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Sorry, Not found :(');
  }

  //localhost:3000/?id=     <-id=HTML하면 HTML이라는 텍스트 화면에 출력
});
console.log('server: http://localhost:3000/');
app.listen(3000);

//301: 의미는 주소를 아래 주소로 옮겼으니 저기 페이지로 가라
//라는 뜻이 담김.

//302: 페이지를 다른 곳으로 옮겨줌.

//response.writeHead(301,
//   {Location: 'http://~~~'}
// );
// response.end();
