const testFolder = './data/';
const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach((file) => {
//     console.log(file);
//   });
// });

fs.readdir(testFolder, function (err, filelist) {
  console.log(filelist);
});
