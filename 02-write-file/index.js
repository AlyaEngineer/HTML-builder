const fs = require('fs');
const path = require('path');
const readline = require("readline");

const pathToFile = path.join(__dirname, 'text.txt');
let writer = fs.createWriteStream(pathToFile, { flags: 'a+' });

let rl = readline.createInterface(
    process.stdin, process.stdout
);

rl.setPrompt('Enter your text, please: ');
rl.prompt();

rl.on('line', (text) => {
if (text.toLowerCase() === 'exit') {
    console.log('Enter is over');
    rl.close();
} else {
    writer.write(text + '\n');
}
});

rl.on('SIGINT', () => {
    console.log('Enter is over');
    rl.close();
});