import { THEMES, type Theme } from "$lib/themes.js";
import { PersistedState } from "runed";

type ThemesConfig = {
	activeTheme: Theme;
};

export const themesConfig = new PersistedState<ThemesConfig>("themes:config2", {
	activeTheme: THEMES[0],
});
