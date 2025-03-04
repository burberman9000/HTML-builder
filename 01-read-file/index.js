const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('error', (err) => {
  console.log('Error');
});

readStream.on('end', () => {
  console.log('Done');
});
