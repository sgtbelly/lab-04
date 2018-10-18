'use strict';

const fs = require('fs');

const buffer = fs.readFileSync(`${__dirname}/assets/baldy.bmp`);

console.log(buffer);

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = Buffer.from(buffer);
  this.type = buffer.toString('utf-8', 0, 2);
  console.log('type', this.type);
  this.fileSize = buffer.readInt32LE(2); //read 32 bytes skipping the first two
  console.log('file size', this.fileSize);
  this.bytesPerPixel = buffer.readInt16LE(28);
  console.log('bytes per pixel', this.bytesPerPixel);
  this.height = buffer.readInt32LE(22);
  console.log('height', this.height);
  this.width = buffer.readInt32LE(18);
  console.log('width', this.width);
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation];
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
  console.log(operation);
  console.log(process.argv);
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {
  Bitmap.transform('greyscale');
  console.log('Transforming bitmap into greyscale', bmp);

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  //TODO: alter bmp to make the image greyscale ...
  function toGrayscale(buffer) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = buffer.width;
    var height = buffer.height;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(buffer, 0, 0);

    var imagePixels = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < imagePixels.height; i++) {
      for (var j = 0; j < imagePixels.width; j++) {
        var x = (i * 4) * imagePixels.width * j * 4;
        var avg = (imagePixels.data[x] + imagePixels.data[x + 1] + imagePixels.data[x + 2]) / 3;
        imagePixels.data[x];
      }
    }
  }
  return toGrayscale(buffer);

};

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();

