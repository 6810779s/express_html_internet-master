const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
let sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');

router.use((req, res, next) => {
  //get방식일때만 사용
  fs.readdir('data', (err, files) => {
    if (err) {
      next(err);
    } else {
      req.file = files;
      next();
    }
  });
});

router.get('/:pageId', (req, res) => {
  let list = '';
  let body = '';

  //HTML, CSS, JavaScript중 선택 했을때
  let title = req.params.pageId;
  fs.readFile(`data/${title}`, `utf-8`, (err, file) => {
    body += file;
    let sanitizedTitle = sanitizeHtml(title, {
      allowedTags: ['b', 'h1', 'h2'],
    });
    let sanitizedHtml = sanitizeHtml(file, {
      allowedTags: ['b', 'h1', 'h2 '],
    });

    let control = `<a href="/page/create/item">create</a>
  <a href="/page/update/${sanitizedTitle}">update</a>
  <form action="/page/process_delete" method="post">
    <input type="hidden" name="id" value="${sanitizedTitle}">
    <input type="submit" value="delete">
  </form>
  `;
    list = template.list(req.file, list);
    body = `<h2>${sanitizedTitle}</h2>${sanitizedHtml}`;

    let HTML = template.html(title, list, body, control);
    res.send(HTML);
  });
});

router.get('/create/item', (req, res) => {
  let title = 'Web-Create';
  let list = '';

  list += template.list(req.file, list);

  let body = `
        <form action="/page/process_create/item" method="post">
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
  res.send(HTML);
});

router.post('/process_create/item', (req, res) => {
  const {
    body: { title, description },
  } = req;

  //fs.writeFile(경로 및 지정할 이름, 내용, ..., callback함수)
  fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
    res.redirect(`/page/${title}`);
  });
});

router.get('/update/:pageId', (req, res) => {
  //원래 있는 값들

  let title = req.params.pageId;
  let securityTitle = path.parse(title).base;

  let description = fs.readFileSync(`data/${securityTitle}`, 'utf8');
  let list = '';
  let body = '';
  let control = `<a href="/page/create">create</a>
  <a href="/page/update/${title}">update</a>`;

  list = template.list(req.file, list);

  body = `<form action="/page/process_update" method="post">
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
  res.send(HTML);
});

router.post('/process_update', (req, res) => {
  const {
    body: { id, title, description },
  } = req;
  fs.rename(`data/${id}`, `data/${title}`, function (err) {
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      res.redirect(`/page/${title}`);
    });
  });
});

router.post('/process_delete', (req, res) => {
  const {
    body: { id },
  } = req;

  let securityId = path.parse(id).base;
  fs.unlink(`data/${securityId}`, (err) => {
    res.redirect('/');
  });
});

module.exports = router;
