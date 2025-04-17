import { MediaQuery } from "svelte/reactivity";

const MOBILE_BREAKPOINT = 768;

export class IsMobile extends MediaQuery {
	constructor() {
		super(`max-width: ${MOBILE_BREAKPOINT - 1}px`);
	}
}
