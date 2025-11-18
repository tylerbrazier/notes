import { strict as assert } from "node:assert";
import { stat } from "node:fs/promises";
import { dirname } from "node:path";
import { suite, test } from "node:test";
import { mkFileOfSize, tmpFileName } from "./mkfile.js";

suite("tmpFileName", () => {
	test("makes a temp dir", async () => {
		const fileName = await tmpFileName();
		assert(fileName);
		const stats = await stat(dirname(fileName));
		assert(stats.isDirectory());
	});

	// TODO more test cases (including mock mkdtemp to throw)
});

suite("mkFileOfSize", () => {
	test("makes a file of a specific size", async () => {
		const f = await tmpFileName();
		const bytes = 12;
		await mkFileOfSize(f, bytes);
		const stats = await stat(f);
		assert.equal(stats.size, bytes);
	});

	// TODO more tests (including mock stream to force backoffs & errors)
});
