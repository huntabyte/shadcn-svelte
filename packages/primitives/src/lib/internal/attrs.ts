export function boolToEmptyStrOrUndef(condition: boolean): "" | undefined {
	return condition ? "" : undefined;
}

export function boolToTrueOrUndef(condition: boolean): true | undefined {
	return condition ? true : undefined;
}
