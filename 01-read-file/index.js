const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');

let stream = fs.ReadStream(pathToFile);

stream.on('data', chunk => {
    console.log(chunk.toString());
});
