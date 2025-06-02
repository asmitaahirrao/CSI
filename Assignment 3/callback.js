// This code reads the content of 'example.txt' and writes it to 'copy.txt' using callbacks.

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  console.log('File content:', data);

  fs.writeFile('copy.txt', data, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('File copied successfully!');
  });
});