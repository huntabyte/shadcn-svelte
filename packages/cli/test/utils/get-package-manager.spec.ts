import path from "path";
import { describe, expect, it } from "vitest";
import { getPackageManager } from "../../src/utils/get-package-manager";

async function getPM(fixtureDir: string) {
	return await getPackageManager(
		path.resolve(__dirname, `../fixtures/${fixtureDir}`)
	);
}

describe("getPackageManager", () => {
	it("handles yarn projects", async () => {
		expect(await getPM("project-yarn")).toEqual("yarn");
	});
	it("handles bun projects", async () => {
		expect(await getPM("project-bun")).toEqual("bun");
	});
	it("handles pnpm projects", async () => {
		expect(await getPM("project-pnpm")).toEqual("pnpm");
	});
	it("handles npm projects", async () => {
		expect(await getPM("project-npm")).toEqual("npm");
	});
});
