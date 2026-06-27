import { strict as assert } from "node:assert";
import { suite, test } from "node:test";
import { hash } from "./hash.js";
import { mkFileOfSize, tmpFileName } from "./mkfile.js";

suite("hash", () => {
	test("should reject when file doesn't exist", () => {
		assert.rejects(() => hash());
		assert.rejects(() => hash("nope"));
	});

	test("should return the file's sha256 sum", async () => {
		const f = await tmpFileName();
		await mkFileOfSize(f, 99, { fillWith: "tmp" });
		assert.equal(
			await hash(f),
			"eef366aadb27b70270b0e595249c501d5b1b421f4e6896dd94751b421720e924",
		);
	});
});
