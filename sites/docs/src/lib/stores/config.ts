import { persisted } from "svelte-persisted-store";

import type { Theme } from "$lib/registry/themes.js";

type Config = {
	theme: Theme["name"];
	radius: number;
};

export const config = persisted<Config>("config", {
	theme: "zinc",
	radius: 0.5,
});
