type FuzzysortResult<T> = {
	obj: T;
};

type FuzzysortOptions<T> = {
	all?: boolean;
	key?: keyof T | string;
	keys?: Array<keyof T | string>;
	limit?: number;
	threshold?: number;
};

declare const fuzzysort: {
	go<T>(search: string, targets: T[], options?: FuzzysortOptions<T>): Array<FuzzysortResult<T>>;
};

export default fuzzysort;
