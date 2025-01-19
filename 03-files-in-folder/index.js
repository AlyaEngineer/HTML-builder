const fs = require('fs');
const path = require('path');

const pathToDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
    } else {
      files.forEach(file => {
        if (file.isFile() === true) {
          const pathToFile = path.join(pathToDir, file.name);
            fs.stat(pathToFile, (error, stats) => {
              const fileSize = stats.size + ` bytes`;
              const fileName = path.basename(file.name, path.extname(file.name));
              const fileExt = path.extname(file.name).slice(1);
              const fullInfo = fileName.concat(' - ', fileExt, ' - ', fileSize);
              console.log(fullInfo);
            });
        }
      })
    }
})