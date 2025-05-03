export function toPosixPath(p: string) {
	return p.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
}
