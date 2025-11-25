import { ogMetadata } from "../ogMetadata.js";
import { createOgImageHandler } from "$lib/og-image.js";
export const prerender = true;
export const GET = createOgImageHandler(ogMetadata);
