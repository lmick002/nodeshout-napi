const util = require('util'),
	stream = require('stream');


/**
 *
 * @constructor
 * @param {shoutT} shout
 */
let ShoutStream = function(shout) {
	stream.Writable.call(this);

	this.shout = shout;
};
util.inherits(ShoutStream, stream.Writable);


/**
 * This method sends recieved buffer to icecast server and handles delay.
 * @param {Buffer} chunk
 * @param {string} encoding
 * @param {function} done
 */
ShoutStream.prototype._write = function(chunk, encoding, done) {
	this.shout.send(chunk, chunk.length);

	let that = this,
		delay = Math.abs(this.shout.delay());

	setTimeout(function() {
		done();
	}, delay);
};


module.exports = ShoutStream;
