import { persisted } from "svelte-local-storage-store";

import type { Style } from "@/registry/styles.js";
import type { Theme } from "@/registry/themes.js";

type Config = {
	style: Style["name"];
	theme: Theme["name"];
	radius: number;
};

export const config = persisted<Config>("config", {
	style: "new-york",
	theme: "zinc",
	radius: 0.5,
});
