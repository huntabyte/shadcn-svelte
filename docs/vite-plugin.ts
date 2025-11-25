import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

/**
 * This Vite plugin automates the generation of Open Graph (OG) image server routes
 * for shadcn svelte docs - dev environment. It scans the project's routes directory for configuration
 * files named `ogMetadata.(ts|js)` and generates corresponding server routes to serve
 *
 * If you create a file named `ogMetadata.ts` in `src/routes/colors/`, the plugin
 * will generate a server route at `src/routes/colors/og.png/+server.ts` that serves
 * OG images based on the metadata defined in `ogMetadata.ts` and you can access the OG image
 * at `http://localhost:5173/colors/og.png` during development and production.
 *
 * Usage:
 * - Place `ogMetadata.ts` or `ogMetadata.js` files in any route directory where you want
 *   to serve OG images.
 * - The plugin will handle the rest, generating the necessary server routes automatically.
 * */

// --- Configuration Constants ---
const PLUGIN_NAME = 'vite-plugin-og-route-generator';
// File to create in directories where we want to serve OG images
const CONFIG_FILE_PATTERN = /^ogMetadata\.(ts|js)$/;
const SERVER_ROUTE_DIR = 'og.png';
// Assumption
const DEFAULT_ROUTES_DIR = 'src/routes';
const MANIFEST_FILE_PATH_STRING = '.svelte-kit/generated-og-images.json';

// --- Types ---
interface Manifest {
	files: string[];
	directories: string[];
}
interface ConfigFile {
	fullPath: string; // Absolute path to sveltekit.og.(ts|js)
	ext: string;      // .ts or .js
}

// --- Generation Helpers ---

function generateServerRouteContent(): string {
	return `import {ogMetadata} from "../ogMetadata.js";
import {createOgImageHandler} from "$lib/og-image.js";
export const prerender = true;
export const GET= createOgImageHandler(ogMetadata)
`;
}

async function initialCleanup(root: string): Promise<void> {
	// 1. Discover all currently existing sveltekit.og.(ts|js) config files.
	const configFiles = await discoverConfigFiles(root);

	const filesToDelete: string[] = [];
	const directoriesToDelete: string[] = [];

	for (const configFile of configFiles) {
		const routeDir = path.dirname(configFile.fullPath);
		const generatedFileName = `+server${configFile.ext}`;
		const generatedDirPath = path.join(routeDir, SERVER_ROUTE_DIR);
		const generatedFilePath = path.join(generatedDirPath, generatedFileName);

		try {
			await fs.access(generatedFilePath);
			filesToDelete.push(generatedFilePath);
			directoriesToDelete.push(generatedDirPath);
		} catch (e) {
			console.error(e);
			// If fs.access fails (ENOENT), the file doesn't exist, skip.
		}
	}

	const uniqueDirectoriesToDelete = [...new Set(directoriesToDelete)];

	if (filesToDelete.length === 0) return;

	console.log(`[${PLUGIN_NAME}] Cleaning up ${filesToDelete.length} existing generated files...`);

	// 3. Execute Deletion
	// Delete Files
	await Promise.all(filesToDelete.map(p => fs.rm(p, { force: true })));

	// Delete Directories
	uniqueDirectoriesToDelete.sort((a, b) => b.localeCompare(a));
	await Promise.all(uniqueDirectoriesToDelete.map(d => fs.rm(d, { force: true, recursive: true })));
}

// --- Discovery Helpers (used by Generation Logic) ---

async function discoverConfigFiles(root: string): Promise<ConfigFile[]> {
	const sveltekitRoutesDir = path.resolve(root, DEFAULT_ROUTES_DIR);
	const configFiles: ConfigFile[] = [];

	try {
		const entries = await fs.readdir(sveltekitRoutesDir, { withFileTypes: true, recursive: true });

		for (const entry of entries) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const fullPath = path.join(entry.path, entry.name);
			if (entry.isFile() && CONFIG_FILE_PATTERN.test(entry.name)) {
				const ext = path.extname(entry.name);
				configFiles.push({ fullPath, ext });
			}
		}
	} catch (e) {
		console.error(e);
		// We will talk about this catch block later
		// Ignore ENOENT
	}
	return configFiles;
}

async function generateRoutes(root: string): Promise<void> {
	const newManifest: Manifest = { files: [], directories: [] };
	const manifestPath = path.resolve(root, MANIFEST_FILE_PATH_STRING);

	const configFiles = await discoverConfigFiles(root);

	for (const configFile of configFiles) {
		const routeDir = path.dirname(configFile.fullPath);
		const SERVER_ROUTE_FILE_NAME = `+server${configFile.ext}`;

		const newServerDirPath = path.join(routeDir, SERVER_ROUTE_DIR);
		const newServerFilePath = path.join(newServerDirPath, SERVER_ROUTE_FILE_NAME);

		const conflictingTsFile = path.join(newServerDirPath, '+server.ts');
		const conflictingJsFile = path.join(newServerDirPath, '+server.js');

		// If the config is .ts, the conflict is .js. If config is .js, the conflict is .ts.
		const conflictPath = configFile.ext === '.ts' ? conflictingJsFile : conflictingTsFile;
		const conflictExists = await fs.access(conflictPath).then(() => true).catch(() => false);
		if(conflictExists) {
			try {
				console.log(`[${PLUGIN_NAME}] Resolving conflict: Deleting ${path.basename(conflictPath)} in ${path.basename(newServerDirPath)}.`);
				await fs.rm(conflictPath, { force: true });
			} catch (e) {
				console.error(e);
				// Ignore, the file might not exist (e.g., first run)
			}
		}

		await fs.mkdir(newServerDirPath, { recursive: true });

		const content = generateServerRouteContent();

		await fs.writeFile(newServerFilePath, content, 'utf-8');

		newManifest.files.push(newServerFilePath);
		newManifest.directories.push(newServerDirPath);

		console.log(`[${PLUGIN_NAME}] Generated route: ${path.relative(root, newServerFilePath)}`);
	}

	const manifestDir = path.dirname(manifestPath);
	await fs.mkdir(manifestDir, { recursive: true });
	await fs.writeFile(manifestPath, JSON.stringify(newManifest, null, 2), 'utf-8');

	console.log(`[${PLUGIN_NAME}] Manifest written to ${path.relative(root, manifestPath)}`);
}

export function ogRouteGenerator(): Plugin {
	let root = '';

	return {
		name: PLUGIN_NAME,
		apply: 'serve',

		configResolved(resolvedConfig) {
			root = resolvedConfig.root;
		},

		// 1. Build Start: Manifest Cleanup -> Generation (with conflict resolution)
		async buildStart() {
			await initialCleanup(root);
			await generateRoutes(root);
		},

		// 2. Build End: Final Cleanup (removes generated files and manifest)
		async closeBundle() {
			console.log(`[${PLUGIN_NAME}] Build finished. Starting final file cleanup.`);
			await initialCleanup(root);
		},

		// 3. Dev Server Hook
		configureServer(server: ViteDevServer) {
			const routesDir = path.resolve(root, DEFAULT_ROUTES_DIR);

			const reRunGeneration = async () => {
				await initialCleanup(root);
				await generateRoutes(root);
			};

			initialCleanup(root).then(reRunGeneration);

			server.watcher.on('all', async (event, filePath) => {
				const fileName = path.basename(filePath);

				if (filePath.startsWith(routesDir) && CONFIG_FILE_PATTERN.test(fileName)) {
					console.log(`[${PLUGIN_NAME}] Config file modified (${event}). Regenerating...`);
					await reRunGeneration();
				}
				if (filePath === path.resolve(root, MANIFEST_FILE_PATH_STRING)) {
					console.log(`[${PLUGIN_NAME}] Manifest file state changed. Recovering...`);
					await reRunGeneration();
				}
			});
		}
	};
}