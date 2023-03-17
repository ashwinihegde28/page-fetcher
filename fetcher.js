// incomplete and needs modification, stretch has not been implemented correctly

const request = require("request");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pageFetcher = (url, dest) => {
  request(url, (error, response, body) => {
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);
    fs.access(dest, fs.F_OK, (err) => {
      if (err) {
        fs.writeFile(dest, body, (err) => {
          if (err) throw err;
          console.log(`Downloaded and saved to ${dest}`);
        });
        rl.close();
      } else if (!err) {
        rl.question(
          `${dest} already exists. Overwrite file? [Y/N] `,
          (answer) => {
            rl.close();
            if (answer === "y" || answer.toLowerCase() === "y") {
              fs.writeFile(dest, body, (err) => {
                if (err) throw err;
                console.log(`Downloaded and saved to ${dest}`);
              });
            } else {
              console.log("Invalid input. Input must be [Y/N]");
            }
          }
        );
      } else {
        rl.close();
      }
    });
  });
};

/*
It should take two command line arguments:
a URL
a local file path
*/

rl.question("Enter page URL to download: ", (pageUrl) => {
  rl.question("Enter destination file path: ", (destPath) => {
    pageFetcher(pageUrl, destPath);
  });
});
