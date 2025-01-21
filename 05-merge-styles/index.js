const fs = require('fs');
const path = require('path');
// const fsPromises = require('fs').promises;

const pathToDir = path.join(__dirname, 'styles');
const pathToNewFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathToDir, (err, files) => {
    console.log(pathToDir);
    if (err) {
      console.log(err);
    } else {
    //   console.log("\Filenames with the .css extension: ");
        files.forEach(file => {
          let pathToFile = path.join(pathToDir, path.basename(file));
          if (path.extname(file) === ".css") {
              // console.log(path.basename(file, '.css'));
              fs.readFile(pathToFile, 'utf8', (err, data) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  // console.log('Содержимое файла CSS:\n', data);
                  const arrOfData = data.toString();
                  // console.log(arrOfData);

                  fs.writeFile(pathToNewFile, arrOfData, { encoding: 'utf8', flag: 'a'}, err => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log('File written successfully.');
                      }
                    });
              });
          }
        })
    }
  })