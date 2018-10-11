'use strict';

const fs = require('fs');
const Bitmap = require('./lib/bitmap.js');

// TODO: How does this work?  Please explain
let [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallback();
// transformWithPromises();

function transformWithCallback() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// Stretch Goal ::: Alter the constructor and this file to do this with Promises as well as callbacks
function transformWithPromises() {
}
