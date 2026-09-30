/**
 * Creates a cubic-bezier easing function matching the CSS cubic-bezier() specification.
 * Uses Newton-Raphson iteration to solve for the parametric t value.
 */
function createCubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
	function A(a1: number, a2: number) {
		return 1.0 - 3.0 * a2 + 3.0 * a1;
	}
	function B(a1: number, a2: number) {
		return 3.0 * a2 - 6.0 * a1;
	}
	function C(a1: number) {
		return 3.0 * a1;
	}

	function calcBezier(t: number, a1: number, a2: number) {
		return ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
	}

	function getSlope(t: number, a1: number, a2: number) {
		return 3.0 * A(a1, a2) * t * t + 2.0 * B(a1, a2) * t + C(a1);
	}

	return function (x: number): number {
		if (x === 0 || x === 1) return x;

		// Newton-Raphson iteration to find t for given x
		let t = x;
		for (let i = 0; i < 8; i++) {
			const slope = getSlope(t, x1, x2);
			if (slope === 0.0) break;
			const currentX = calcBezier(t, x1, x2) - x;
			t -= currentX / slope;
		}

		return calcBezier(t, y1, y2);
	};
}

/**
 * CSS `ease` easing function: cubic-bezier(0.25, 0.1, 0.25, 1.0)
 * Gentle acceleration then strong deceleration — matches Recharts' default.
 */
export const ease = createCubicBezier(0.25, 0.1, 0.25, 1.0);

/** Default motion config for splines, pies, arcs (1500ms) */
export const defaultMotion = { type: "tween", duration: 1500, easing: ease } as const;

/** Default motion config for bar charts (500ms per property) */
export const defaultBarMotion = {
	x: { type: "tween", duration: 500, easing: ease },
	width: { type: "tween", duration: 500, easing: ease },
	y: { type: "tween", duration: 500, easing: ease },
	height: { type: "tween", duration: 500, easing: ease },
} as const;

/** Default motion config for ChartClipPath width animation */
export const defaultClipMotion = {
	width: { type: "tween", duration: 1500, easing: ease },
} as const;

/** Default tweened options for radar chart scale animation */
export const defaultRadarScale = { duration: 1500, easing: ease } as const;
