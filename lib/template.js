module.exports = {
  html: function (title, list, body, control) {
    return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;
  },
  list: function (files, list) {
    files.forEach((file) => {
      list += `<li><a href="/page/${file}">${file}</a></li>`;
    });

    return `<ul>${list}</ul>`;
  },
};

// module.exports = template;
