import { persisted } from "svelte-local-storage-store";

import type { Style } from "@/registry/styles";
import type { Theme } from "@/registry/themes";

type Config = {
	style: Style["name"];
	theme: Theme["name"];
	radius: number;
};

export const config = persisted<Config>("config", {
	style: "default",
	theme: "zinc",
	radius: 0.5
});
