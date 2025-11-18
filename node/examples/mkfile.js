import { strict as assert } from "node:assert";
import { Buffer } from "node:buffer";
import { createWriteStream } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * The returned file isn't created but its dir will be an empty temp dir
 */
export async function tmpFileName(baseName = "file") {
	assert(baseName);
	assert.equal(typeof baseName, "string");
	const prefix = "tmp";
	const dir = await mkdtemp(join(tmpdir(), prefix));
	return join(dir, baseName);
}

/**
 * Stream to keep mem consumption low
 */
export function mkFileOfSize(
	fileName,
	totalBytes,
	{
		// chunkSize should probably be smaller than the writeStream's
		// high water mark (default 16384)
		// https://nodejs.org/api/fs.html#fscreatewritestreampath-options
		chunkSize = Math.min(10000, totalBytes),
		fillWith = 0,
	} = {},
) {
	assert(fileName);
	assert.equal(typeof fileName, "string");

	assert(!Number.isNaN(totalBytes));
	assert(totalBytes > 0);

	assert(!Number.isNaN(chunkSize));
	assert(chunkSize > 0);
	assert(chunkSize <= totalBytes);

	const stream = createWriteStream(fileName);
	let buf = Buffer.alloc(chunkSize, fillWith);
	let bytesLeftToWrite = totalBytes;

	return new Promise((resolve, reject) => {
		stream.on("error", reject);
		stream.on("finish", resolve);
		write();
	});

	function write() {
		let keepWriting = true;

		while (!stream.errored && keepWriting) {
			if (bytesLeftToWrite < buf.length)
				buf = buf.subarray(0, bytesLeftToWrite);

			keepWriting = stream.write(buf);

			bytesLeftToWrite -= buf.length;
			keepWriting &&= bytesLeftToWrite > 0;

			if (bytesLeftToWrite <= 0) stream.end();
			// check if we should back off
			else if (!keepWriting) stream.once("drain", write);
		}
	}
}
