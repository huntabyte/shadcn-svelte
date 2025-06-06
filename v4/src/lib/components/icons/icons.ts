import Css from "./css.svelte";
import Json from "./json.svelte";
import Svelte from "./svelte.svelte";
import Ts from "./ts.svelte";
import FileIcon from "@lucide/svelte/icons/file";

export function getIconForLanguageExtension(language: string) {
	switch (language) {
		case "svelte":
			return Svelte;
		case "json":
			return Json;
		case "css":
			return Css;
		case "ts":
		case "js":
		case "typescript":
			return Ts;
		default:
			return FileIcon;
	}
}
