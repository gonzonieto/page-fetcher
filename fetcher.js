const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const URL = args[0];
const PATH = args[1];

request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  fs.writeFile(PATH, body, err => {
    if (err) {
      console.error(err);
      return;
    }
    fs.stat(PATH, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${PATH}`);
    });
  });
});