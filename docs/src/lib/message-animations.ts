export const MESSAGE_ANIMATIONS = {
	fade: {
		id: "fade",
		name: "Fade",
		class: "animate-in fade-in duration-200",
	},
	"slide-up": {
		id: "slide-up",
		name: "Slide Up",
		class: "animate-in fade-in slide-in-from-bottom-2 duration-300",
	},
	"slide-side": {
		id: "slide-side",
		name: "Slide Side",
		class: "animate-in fade-in slide-in-from-end-4 duration-300",
	},
	pop: {
		id: "pop",
		name: "Pop",
		class: "animate-in fade-in zoom-in-95 slide-in-from-bottom-1 duration-200",
	},
	"spring-bounce": {
		id: "spring-bounce",
		name: "Spring Bounce",
		class: "animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300",
	},
	"blur-fade": {
		id: "blur-fade",
		name: "Blur Fade",
		class: "animate-in fade-in slide-in-from-bottom-1 duration-300",
	},
	"scale-fade": {
		id: "scale-fade",
		name: "Scale Fade",
		class: "animate-in fade-in zoom-in-95 duration-200",
	},
} as const;

export type MessageAnimationId = keyof typeof MESSAGE_ANIMATIONS;
export type MessageAnimationPreset = (typeof MESSAGE_ANIMATIONS)[MessageAnimationId];
