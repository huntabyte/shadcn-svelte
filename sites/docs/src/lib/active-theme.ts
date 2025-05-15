import { PersistedState } from "runed";
import { THEMES } from "./registry/ui/chart/chart-utils.js";

export const activeTheme = new PersistedState("themes:config2", THEMES);
