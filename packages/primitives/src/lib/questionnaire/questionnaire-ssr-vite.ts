import { TextDecoder as NodeTextDecoder } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ViteDevServer } from "vite";
import type { QuestionnaireTestModel } from "./questionnaire-test-model.svelte.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, "../..");
const casesPath = path.resolve(dirname, "questionnaire-cases.svelte");

let server: ViteDevServer | undefined;

function useNodeTextEncoder() {
	globalThis.TextEncoder = class {
		encode(input = "") {
			return Uint8Array.from(Buffer.from(String(input), "utf8"));
		}
	} as typeof TextEncoder;
	globalThis.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;
}

async function getServer() {
	if (!server) {
		useNodeTextEncoder();
		const { svelte } = await import("@sveltejs/vite-plugin-svelte");
		const { createServer } = await import("vite");
		server = await createServer({
			configFile: false,
			root: packageRoot,
			appType: "custom",
			logLevel: "error",
			plugins: [svelte()],
			resolve: {
				alias: {
					$lib: path.resolve(dirname, ".."),
				},
			},
			server: {
				hmr: false,
				middlewareMode: true,
			},
		});
	}
	return server;
}

export async function renderQuestionnaireToString(model: QuestionnaireTestModel) {
	const vite = await getServer();
	const [{ render }, casesModule] = await Promise.all([
		vite.ssrLoadModule("svelte/server"),
		vite.ssrLoadModule(casesPath),
	]);
	return render(casesModule.default, { props: { model } }) as {
		body: string;
		head: string;
	};
}

export async function closeQuestionnaireSsrVite() {
	if (!server) return;
	await server.close();
	server = undefined;
}
