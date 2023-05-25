import { error } from "@sveltejs/kit";

import type { DocResolver } from "$lib/types/docs";
import { slugFromPath } from "$lib/utils";

import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const modules = import.meta.glob(`/src/content/**/*.md`);

  let match: { path?: string; resolver?: DocResolver } = {};

  for (const [path, resolver] of Object.entries(modules)) {
    if (slugFromPath(path) === event.params.slug) {
      match = { path, resolver: resolver as unknown as DocResolver };
      break;
    }
  }

  const doc = await match?.resolver?.();

  if (!doc || !doc.metadata) {
    throw error(404);
  }
  return {
    component: doc.default,
    metadata: doc.metadata
  };
};
