const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const pathToDir = path.join(__dirname, 'files');
const pathToNewDir = path.join(__dirname, 'files-copy');


fsPromises.access(pathToNewDir)
  .then(() => {
    return fsPromises.rm(pathToNewDir, { recursive: true, force: true })
      .then(() => {
        console.log('Папка files-copy удалена.');
      });
  })
  .catch(() => {
    console.log('Папка files-copy не существует. Она будет создана.');
  })
  .finally(() => {
    fsPromises.mkdir(pathToNewDir, { recursive: true })
    .then(function() {
      console.log('Каталог files-copy успешно создан.');
    })
    .catch(function() {
      console.log('не удалось создать каталог.');
    });

  fs.readdir(pathToDir, (err, files) => {
    if (err)
      console.log(err);
    else {
        files.forEach(file => {
        const pathToFile = path.join(__dirname, 'files', file);
        const pathToNewFile = path.join(__dirname, 'files-copy', file);
        fsPromises.copyFile(pathToFile, pathToNewFile)
            .then(function() {
            console.log('Файл' + ` ${file} ` + 'скопирован.');
            })
            .catch(function(error) {
            console.log(error);
            });
        })
    }
  })
  });
