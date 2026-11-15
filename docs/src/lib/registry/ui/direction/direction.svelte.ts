import { getBitsConfig } from "bits-ui";

/** Call during component initialization. Read `current` reactively to track changes. */
export function useDirection() {
	const config = getBitsConfig();
	return {
		get current(): "ltr" | "rtl" {
			return config.dir.current ?? "ltr";
		},
	};
}
