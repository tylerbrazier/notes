import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

export async function hash(f, { algorithm = "sha256" } = {}) {
	const r = createReadStream(f);
	const h = createHash(algorithm);
	await pipeline(r, h);
	return h.digest("hex");
}
