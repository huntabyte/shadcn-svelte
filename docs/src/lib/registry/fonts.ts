import { type RegistryFont } from "@shadcn-svelte/registry";

export const fonts = [
	{
		name: "font-geist-sans",
		title: "Geist",
		type: "registry:font",
		font: {
			family: "'Geist Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/geist/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/geist"],
		},
	},
	{
		name: "font-inter",
		title: "Inter",
		type: "registry:font",
		font: {
			family: "'Inter Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/inter/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/inter"],
		},
	},
	{
		name: "font-noto-sans",
		title: "Noto Sans",
		type: "registry:font",
		font: {
			family: "'Noto Sans Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/noto-sans/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/noto-sans"],
		},
	},
	{
		name: "font-nunito-sans",
		title: "Nunito Sans",
		type: "registry:font",
		font: {
			family: "'Nunito Sans Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/nunito-sans/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/nunito-sans"],
		},
	},
	{
		name: "font-figtree",
		title: "Figtree",
		type: "registry:font",
		font: {
			family: "'Figtree Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/figtree/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/figtree"],
		},
	},
	{
		name: "font-roboto",
		title: "Roboto",
		type: "registry:font",
		font: {
			family: "'Roboto Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/roboto/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/roboto"],
		},
	},
	{
		name: "font-raleway",
		title: "Raleway",
		type: "registry:font",
		font: {
			family: "'Raleway Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/raleway/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/raleway"],
		},
	},
	{
		name: "font-dm-sans",
		title: "DM Sans",
		type: "registry:font",
		font: {
			family: "'DM Sans Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/dm-sans/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/dm-sans"],
		},
	},
	{
		name: "font-public-sans",
		title: "Public Sans",
		type: "registry:font",
		font: {
			family: "'Public Sans Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/public-sans/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/public-sans"],
		},
	},
	{
		name: "font-outfit",
		title: "Outfit",
		type: "registry:font",
		font: {
			family: "'Outfit Variable', sans-serif",
			cssImport: '@import "@fontsource-variable/outfit/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/outfit"],
		},
	},
	{
		name: "font-jetbrains-mono",
		title: "JetBrains Mono",
		type: "registry:font",
		font: {
			family: "'JetBrains Mono Variable', monospace",
			cssImport: '@import "@fontsource-variable/jetbrains-mono/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/jetbrains-mono"],
		},
	},
	{
		name: "font-geist-mono",
		title: "Geist Mono",
		type: "registry:font",
		font: {
			family: "'Geist Mono Variable', monospace",
			cssImport: '@import "@fontsource-variable/geist-mono/index.css";',
			variable: "--font-sans",
			dependencies: ["@fontsource-variable/geist-mono"],
		},
	},
] satisfies RegistryFont[];
