import type { Cookies } from "@sveltejs/kit";
import { Context, PersistedState, watch } from "runed";
import { useCookie } from "./hooks/use-cookie.svelte.js";

export const INSTALLATION_TYPES = ["cli", "manual"] as const;

export type InstallationType = (typeof INSTALLATION_TYPES)[number];

export const InstallationTypeContext = new Context<PersistedState<InstallationType>>(
	"InstallationTypeContext"
);

export function parseInstallationTypeCookie(cookies: Cookies): InstallationType {
	const installationType = cookies.get("scn_installation_type");
	if (!installationType) return "cli";
	return installationType as InstallationType;
}

export function setInstallationTypeContext(installationType: () => InstallationType) {
	const installationTypeState = InstallationTypeContext.set(
		new PersistedState<InstallationType>("scn-installation-type", installationType())
	);

	watch.pre(
		() => installationType(),
		() => {
			installationTypeState.current = installationType();
		}
	);

	useCookie({
		value: () => installationTypeState.current,
		name: "scn_installation_type",
	});

	return installationTypeState;
}
