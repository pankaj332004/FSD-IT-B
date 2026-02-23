// const fs = require("fs");
// const path = require('path');

// const fsPromises = require('fs').promises;



// async function manageFile() {
//   try {
//     // Write data to a file
//     // await fsPromises.writeFile('example.txt', 'Hello, Node.js fs module!');
//     // console.log('File "example.txt" written successfully');

//     // // Read the content of the file
//     // const data = await fsPromises.readFile('example.txt', 'utf8');
//     // console.log('File content:', data);
    
//     // // Append data to the file
//     // await fsPromises.appendFile('example.txt', '\nThis is appended data.');
//     // console.log('Data appended successfully');

//     // Delete the file
//     // await fsPromises.unlink('example.txt');
//     // console.log('File deleted successfully');

//     const dat = await fsPromises.readFile('example.txt','utf-8');
//     console.log(dat);
//   } catch (err) {
//     console.error('An error occurred:', err);
//   }
// }

// manageFile();


// fs.rename('example.txt','newFile.txt',(err)=>{
//     if (err) {
//     console.error('Error renaming file:', err);
//     return;
//   }
//   console.log('File name changed successfully!');
// })

// async function createDir() {
//   try {
//     await fs.mkdir('./myDir', { recursive: true });
//     console.log('Directory created successfully!');
//   } catch (err) {
//     console.error('Error creating directory:', err);
//   }
// }

// createDir();

const os = require('os');
console.log("plateform",os.platform());
console.log("userinfo",os.userInfo());
console.log("CPU",os.arch());

console.log("free memory",os.freemem());
console.log("total memory",os.totalmem());
console.log("uptime",os.uptime());
console.log("Home Dir",os.homedir());
console.log("Host name",os.hostname());