const stream = require('stream'),
	fs = require('fs');


/**
 * This class is simple clone of readable file stream that supports custom buffer size.
 * Because, fs.createReadableStream does not support to specify buffer size.
 * @constructor
 * @param {string} file File path.
 * @param {number} chunkSize Buffer size in bytes.
 */

class FileReadStream extends stream.Readable {
	constructor(file, chunkSize) {
		super();

		stream.Readable.call(this);

		this.reset();
		this.file = file;
		this.chunkSize = chunkSize;
		this.buffer = new Buffer.alloc(this.chunkSize);

		this.start();
	}

	/**
	 * Resets class properties.
	 */

	reset() {
		this.file = null;
		this.fileSize = null;
		this.totalBytesRead = null;
		this.chunkSize = null;
		this.fd = null;
	};

	/**
	 * Opens and gets stats of file.
	 */

	start() {
		this.fd = fs.openSync(this.file, 'r');

		const stats = fs.fstatSync(this.fd);
		this.fileSize = stats.size;
		this.totalBytesRead = 0;
	};

	/**
	 * Reads and pushes chunk to stream pipe.
	 * @override
	 */

	_read() {
		if (this.totalBytesRead >= this.fileSize) {
			// File is finished.
			fs.closeSync(this.fd);
			this.push(null);
			return;
		}

		const bytesRead = fs.readSync(this.fd, this.buffer, 0, this.chunkSize, this.totalBytesRead);

		this.totalBytesRead += bytesRead;
		this.push(this.buffer);
	};
}

module.exports = FileReadStream;
