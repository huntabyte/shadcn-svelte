export function createId(uid: string): string;
export function createId(prefix: string, uid: string): string;
export function createId(prefixOrUid: string, uid?: string): string {
	if (uid === undefined) return `shadcn-${prefixOrUid}`;
	return `shadcn-${prefixOrUid}-${uid}`;
}
