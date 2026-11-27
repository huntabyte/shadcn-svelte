export type DirectionalSide = "top" | "bottom" | "left" | "right" | "inline-start" | "inline-end";

/** Resolve logical intent at the Bits UI boundary; physical sides stay physical. */
export function resolveSide(side: DirectionalSide, direction: "ltr" | "rtl") {
	if (side === "inline-start") return direction === "rtl" ? "right" : "left";
	if (side === "inline-end") return direction === "rtl" ? "left" : "right";
	return side;
}
