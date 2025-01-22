const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const pathToDir = path.join(__dirname, 'styles');
const pathToNewFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundlerFile() {
  try {
    await fsPromises.access(pathToNewFile)
    .then(() => {
      return fsPromises.rm(pathToNewFile, { recursive: true, force: true })
        .then(() => {
          console.log('Файл bundle.css удалён.');
        });
      })
      .catch(() => {
        console.log('Файл bundle.css не существует. Он будет создан.');
      });
  } catch {
    console.log('Ошибка файла');
  }
}
createBundlerFile();

fs.readdir(pathToDir, (err, files) => {
    console.log(pathToDir);
    if (err) {
      console.log(err);
    } else {
        files.forEach(file => {
          let pathToFile = path.join(pathToDir, path.basename(file));
          if (path.extname(file) === ".css") {
              // console.log(path.basename(file, '.css'));
                fs.readFile(pathToFile, 'utf8', (err, data) => {
                  if (err) {
                    console.error(err);
                  }
                  // console.log('Содержимое файла CSS:\n', data);
                  const arrOfData = data;
                  // console.log(arrOfData);

                fs.writeFile(pathToNewFile, arrOfData, { encoding: 'utf8', flag: 'a'}, err => {
                  console.log('Новый файл bundle.css успешно создан');
                  if (err) {
                    console.error(err);
                  }
                });
              });
          }
        })
      }
})
