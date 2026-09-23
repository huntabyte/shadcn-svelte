import { fileURLToPath } from "node:url";
import { setupGlobal } from "sv/testing";

const TEST_DIR = fileURLToPath(new URL("../../.test-output/", import.meta.url));

export default setupGlobal({ TEST_DIR });
