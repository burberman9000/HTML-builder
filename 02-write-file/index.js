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
    console.log('Thank you for using the program. Goodbye!');
    rl.close();
    process.exit(0);
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

askForInput();

process.on('SIGINT', () => {
  console.log('\nThank you for using the program. Goodbye!');
  rl.close();
  process.exit(0);
});
