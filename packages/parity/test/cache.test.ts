import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CACHE_TTL_MS, isCacheFresh } from "../src/compare.ts";

const HOUR = 60 * 60 * 1000;

describe("isCacheFresh", () => {
	let dir: string;
	let file: string;

	beforeEach(() => {
		dir = fs.mkdtempSync(path.join(os.tmpdir(), "parity-cache-test-"));
		file = path.join(dir, "item.json");
		fs.writeFileSync(file, "{}");
	});

	afterEach(() => {
		fs.rmSync(dir, { recursive: true, force: true });
	});

	it("defaults to a one hour ttl", () => {
		expect(CACHE_TTL_MS).toBe(HOUR);
	});

	it("is false for a missing file", () => {
		expect(isCacheFresh(path.join(dir, "missing.json"))).toBe(false);
	});

	it("is true for a file written within the ttl", () => {
		const now = fs.statSync(file).mtimeMs + HOUR / 2;
		expect(isCacheFresh(file, CACHE_TTL_MS, now)).toBe(true);
	});

	it("is false once the file is older than the ttl", () => {
		const now = fs.statSync(file).mtimeMs + 2 * HOUR;
		expect(isCacheFresh(file, CACHE_TTL_MS, now)).toBe(false);
	});
});
