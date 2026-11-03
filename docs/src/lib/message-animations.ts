// Adapted from https://github.com/shadcn-ui/ui/blob/main/apps/v4/lib/message-animations.ts
//
// Upstream expresses these as `motion` (previously Framer Motion) variants.
// Here each preset is a Svelte transition (`in:` directive) so the entrance runs
// as a CSS animation with no per-row state.
//
// Exit variants are omitted for now given that they were defined but never used upstream.
import { cubicOut, expoOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

type MessageAnimationTransition = (node: HTMLElement) => TransitionConfig;

type SpringOptions = {
	stiffness: number;
	damping: number;
	mass: number;
};

/**
 * Turns `motion`'s `type: "spring"` parameters into a transition duration and easing.
 * The easing is the closed-form response of an underdamped spring (damping ratio < 1),
 * so `t` may briefly exceed 1 for the overshoot, the duration is how long it takes to
 * settle within 0.1% of the target.
 */
function spring({ stiffness, damping, mass }: SpringOptions) {
	const omega = Math.sqrt(stiffness / mass);
	const zeta = damping / (2 * Math.sqrt(stiffness * mass));
	const omegaD = omega * Math.sqrt(1 - zeta * zeta);
	const settle = Math.log(1000) / (zeta * omega);

	return {
		duration: settle * 1000,
		easing: (t: number) => {
			const s = t * settle;
			const decay = Math.exp(-zeta * omega * s);
			return 1 - decay * (Math.cos(omegaD * s) + ((zeta * omega) / omegaD) * Math.sin(omegaD * s));
		},
	};
}

export const MESSAGE_ANIMATIONS = {
	fade: {
		id: "fade",
		name: "Fade",
		transition: () => ({
			duration: 220,
			easing: cubicOut,
			css: (t) => `opacity: ${t}`,
		}),
	},
	"slide-up": {
		id: "slide-up",
		name: "Slide Up",
		transition: () => ({
			duration: 260,
			easing: expoOut,
			css: (t, u) => `opacity: ${t}; transform: translateY(${10 * u}px)`,
		}),
	},
	"slide-side": {
		id: "slide-side",
		name: "Slide Side",
		transition: () => ({
			duration: 280,
			easing: expoOut,
			css: (t, u) => `opacity: ${t}; transform: translateX(${18 * u}px)`,
		}),
	},
	pop: {
		id: "pop",
		name: "Pop",
		transition: (node) => {
			node.style.transformOrigin = "100% 100%";
			return {
				...spring({ stiffness: 500, damping: 34, mass: 0.7 }),
				css: (t, u) => `opacity: ${t}; transform: translateY(${6 * u}px) scale(${1 - 0.06 * u})`,
			};
		},
	},
	"spring-bounce": {
		id: "spring-bounce",
		name: "Spring Bounce",
		transition: () => ({
			...spring({ stiffness: 520, damping: 30, mass: 0.7 }),
			css: (t, u) => `opacity: ${t}; transform: translateY(${12 * u}px) scale(${1 - 0.04 * u})`,
		}),
	},
	"blur-fade": {
		id: "blur-fade",
		name: "Blur Fade",
		transition: () => ({
			duration: 280,
			easing: cubicOut,
			css: (t, u) => `opacity: ${t}; filter: blur(${4 * u}px); transform: translateY(${6 * u}px)`,
		}),
	},
	"scale-fade": {
		id: "scale-fade",
		name: "Scale Fade",
		transition: () => ({
			duration: 240,
			easing: cubicOut,
			css: (t, u) => `opacity: ${t}; transform: scale(${1 - 0.02 * u})`,
		}),
	},
} as const satisfies Record<
	string,
	{ id: string; name: string; transition: MessageAnimationTransition }
>;

export type MessageAnimationId = keyof typeof MESSAGE_ANIMATIONS;
export type MessageAnimationPreset = (typeof MESSAGE_ANIMATIONS)[MessageAnimationId];
