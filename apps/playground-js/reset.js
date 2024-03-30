import { execSync } from 'node:child_process';
import fs from 'node:fs';

function reset() {
	const fns = [deleteSCNArtifacts, uninstallDeps, resetTailwindConfig, resetPcssStyles];
	fns.forEach(safe);
}

reset();

function deleteSCNArtifacts() {
	// delete `./components.json` from this directory
	fs.unlinkSync('./components.json');

	// delete './src/lib/components' directory
	fs.rmdirSync('./src/lib/components', { recursive: true });

	// delete './src/lib/utils.js' file
	fs.unlinkSync('./src/lib/utils.js');
}

function uninstallDeps() {
	execSync(
		'pnpm uninstall bits-ui formsnap sveltekit-superforms vaul-svelte cmdk-sv @internationalized/date'
	);
}

function resetTailwindConfig() {
	const startingConfig = `/** @type {import('tailwindcss').Config}*/
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
	extend: {}
	},

	plugins: []
};

module.exports = config;
`;

	fs.renameSync('./tailwind.config.js', './tailwind.config.cjs');

	fs.writeFileSync('./tailwind.config.cjs', startingConfig, 'utf-8');
}

function resetPcssStyles() {
	const startingStyles = `/* Write your global styles here, in PostCSS syntax */
@tailwind base;
@tailwind components;
@tailwind utilities`;

	fs.writeFileSync('./src/app.pcss', startingStyles, 'utf-8');
}

function safe(fn) {
	try {
		fn();
	} catch {
		//
	}
}
