import { watch } from "node:fs";
import { updateJsonImport, veliteIndexPath } from "./velite-utils.js";

// Configuration
let isUpdatingIndex = false;

watch(veliteIndexPath, async (eventType, filename) => {
	if (eventType === "change" && !isUpdatingIndex) {
		console.info(`File ${filename} has been modified`);
		updateJsonImport((isUpdating) => (isUpdatingIndex = isUpdating));
	}
});
