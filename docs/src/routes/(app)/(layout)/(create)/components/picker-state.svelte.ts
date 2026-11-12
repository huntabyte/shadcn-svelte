import { getContext, setContext, tick, untrack } from "svelte";
import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";

const key = Symbol("create-picker-layout");
export class PickerLayout {
	anchor = $state<HTMLElement | null>(null);
	scroller = $state<HTMLElement | null>(null);
	active = $state<CreatePicker | null>(null);
	mobile = new IsMobile();
	constructor() {
		setContext(key, this);
		$effect(() => {
			// Horizontal mobile scroll must not offset the desktop picker anchors.
			if (!this.mobile.current && this.scroller) this.scroller.scrollLeft = 0;
		});
	}
}
export class CreatePicker {
	layout = getContext<PickerLayout | undefined>(key);
	mobile = new IsMobile();
	open = $state(false);
	scrollLeft = 0;
	capture = () => {
		if (this.mobile.current && this.layout?.scroller)
			this.scrollLeft = this.layout.scroller.scrollLeft;
	};
	restore = async () => {
		if (!this.mobile.current || !this.layout?.scroller) return;
		const restore = () => {
			if (this.layout?.scroller)
				this.layout.scroller.scrollLeft = this.mobile.current ? this.scrollLeft : 0;
		};
		await tick();
		restore();
		requestAnimationFrame(() => {
			restore();
			requestAnimationFrame(restore);
		});
	};
	constructor(clear: () => void) {
		$effect(() => {
			if (!this.open) return;
			const close = () => {
				this.open = false;
			};
			window.addEventListener("blur", close);
			return () => window.removeEventListener("blur", close);
		});
		$effect(() => {
			const open = this.open;
			untrack(() => {
				if (open && this.layout) {
					if (this.layout.active && this.layout.active !== this) this.layout.active.open = false;
					this.layout.active = this;
				}
				if (!open) clear();
				void this.restore();
			});
		});
	}
}
