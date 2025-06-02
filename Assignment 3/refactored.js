// This code reads the content of 'example.txt' and writes it to 'copy.txt' using async/await.

const fs = require('fs').promises;

async function copyFile() {
  const fileName = 'example.txt';
  const copyName = 'copy.txt';

  try {
    // Check if file exists
    try {
      await fs.access(fileName);
    } catch {
      // If not, create it with default content
      await fs.writeFile(fileName, 'Default content created!');
    }

    const data = await fs.readFile(fileName, 'utf8');
    console.log('File content:', data);

    await fs.writeFile(copyName, data);
    console.log('File copied successfully!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

copyFile();