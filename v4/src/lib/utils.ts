import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getComponentName(name: string) {
	// convert kebab-case to title case
	return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
