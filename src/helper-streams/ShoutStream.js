// wow - 2020

const stream = require('stream');

class ShoutStream extends stream.Writable {
	constructor(shout) {
		super();
		this.shout = shout;
	}

	_write(chunk, encoding, done) {
		// weird fix for a weird problem, but it works so forget about it
		let that = this;
		setTimeout(function () {
			that.shout.send(chunk, chunk.length);
			done();
		}, this.shout.delay());
	};
}

module.exports = ShoutStream;
