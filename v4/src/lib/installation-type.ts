import { createConfig } from "./config.js";

export const INSTALLATION_TYPES = ["cli", "manual"] as const;
export type InstallationType = (typeof INSTALLATION_TYPES)[number];

const installationTypeConfig = createConfig({
	key: "scn-installation-type",
	values: INSTALLATION_TYPES,
	defaultValue: "cli",
});

export const InstallationTypeContext = installationTypeConfig.context;
export const parseInstallationTypeCookie = installationTypeConfig.parseFromCookie;
export const setInstallationTypeContext = installationTypeConfig.setContext;
