const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const outputStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome! Please enter some text. Type "exit" to leave.');

const handleUserInput = (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    closeProgram();
  } else {
    outputStream.write(`${input}\n`);
    console.log(
      'Text written to file. Enter more text or type "exit" to quit.',
    );
    askForInput();
  }
};

const askForInput = () => {
  rl.question('Please enter your text: ', handleUserInput);
};

const closeProgram = () => {
  console.log('Thank you for using the program. Goodbye!');
  rl.close();
  outputStream.end();
  process.exit(0);
};

process.on('SIGINT', closeProgram);

askForInput();
