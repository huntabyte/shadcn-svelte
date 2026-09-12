// @vitest-environment node

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { createServer } from "vite";
import { describe, expect, it } from "vitest";

describe("Questionnaire SSR", () => {
	it("renders stable collection progress on the server", async () => {
		const server = await createServer({
			configFile: false,
			plugins: [svelte()],
			server: { middlewareMode: true },
		});
		try {
			const [{ default: Component }, { render }] = await Promise.all([
				server.ssrLoadModule("/src/lib/questionnaire/questionnaire.test.svelte"),
				server.ssrLoadModule("svelte/server"),
			]);
			const { body } = render(Component);
			expect(body).toContain("Question 1 of 2");
			expect(body).toContain("What should we build?");
		} finally {
			await server.close();
		}
	});
});
