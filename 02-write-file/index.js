const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

stdin.on('data', (data) => {
  const input = data.toString().trim();
  fs.appendFile(path.join(__dirname, 'text12.txt'), `${data}`, (err) => {
    if (err) throw err;
  });

  writeStream.write(`${input}\n`, (err) => {
    if (err) {
      console.log('Unable to write a file');
    }
  });
});
