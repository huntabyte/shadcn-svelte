import { Writable } from "node:stream";

export const silentOutput = new Writable({
	write(_chunk, _encoding, callback) {
		callback();
	},
});