import { persisted } from "svelte-persisted-store";

import type { Style } from "$lib/registry/styles.js";
import type { Theme } from "$lib/registry/themes.js";

type Config = {
	style: Style["name"];
	theme: Theme["name"];
	radius: number;
};

export const config = persisted<Config>("config", {
	style: "default",
	theme: "zinc",
	radius: 0.5,
});
