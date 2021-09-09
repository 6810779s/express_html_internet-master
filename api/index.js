const express = require('express');
const fs = require('fs');
const router = express.Router();
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

router.get('/', (req, res) => {
  let title = '';
  let description = '';
  let list = '';
  let body = '';
  let control = '';

  //기본 페이지/ 첫화면일때
  title = 'Welcome';
  description = `
  <p>hello node.js</p>
  <img style="width:300px;height:300px;" src="/images/welcome.jpg" alt="welcome">`;
  list = template.list(req.file, list);
  control = `<a href="/page/create/item">create</a>`;
  body = `<h2>${title}</h2>${description}`;

  let HTML = template.html(title, list, body, control);
  res.send(HTML);
});

module.exports = router;
