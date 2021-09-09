const express = require('express');
const app = express();
const compression = require('compression');
const pageRouter = require('./api/page.js');
const indexRouter = require('./api/index.js');

//body-parser is deprecated
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(compression()); //npm install compression --save
app.use('/page', pageRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  res.status(404).send('Sorry can not find:(');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('SomeThing Broke!!!');
});

app.listen(3000, () => {
  console.log('3000포트에서 서버 시작');
});
