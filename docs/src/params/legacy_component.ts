import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => /^(form|typography)(\.md)?$/.test(param);
