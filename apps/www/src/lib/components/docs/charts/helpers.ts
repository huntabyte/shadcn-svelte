export function color(opacity: string = "1") {
	return () => `hsl(var(--primary) / ${opacity})`;
}

export function colorArray<T>() {
	return (_: T, i: number) => {
		if (i === 0) return `hsl(var(--primary))`;
		return `hsl(var(--primary) / 0.20)`;
	};
}
