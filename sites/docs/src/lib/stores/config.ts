import { PersistedState } from "runed";

import type { Theme } from "$lib/registry/themes.js";

type Config = {
	theme: Theme["name"];
	radius: number;
};

export const config = new PersistedState<Config>("config", { theme: "zinc", radius: 0.5 });
