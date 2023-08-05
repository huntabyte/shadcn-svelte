import { nanoid } from "nanoid/non-secure";

export function noop() {
	// do nothing
}

export function id() {
	return nanoid(10);
}
