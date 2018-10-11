'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const transforms = {
  greyscale: require('./transforms/greyscale.js'),
};

/**
 * Bitmap Class
 */
class Bitmap {

  /**
   * Creates a new bitmap
   * @param filePath
   * @constructor
   */
  constructor(filePath) {
    this.file = filePath;
  }

  /**
   * Parses a bitmap according to the specification
   * @param buffer (file buffer)
   */
  parse(buffer) {
    if ( ! this.colorArray.length ) {
      throw 'Invalid .bmp Format';
    }
  }

  /**
   * Transforms a bitmap using a named transformation function
   * Note that we require all of our transformations into the "transforms" object at the top of this module. Each of them can than be called as a function.  This will throw an error if an invalid transformation is asked for.
   * @param operation
   */
  transform(operation) {
    try {
      //TODO: Hos is this able to call on a given operation? (how does this wire up the module?)
      transforms[operation](this);
      this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
    }
    catch(e) {
      throw 'Invalid Transformation Specified';
    }
  }

}

module.exports = Bitmap;
