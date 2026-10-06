<script lang="ts">
	import { Toaster as Sonner, type ToasterProps } from "svelte-sonner";
	import "./toaster.css";
	import { cn } from "$lib/utils.js";
	import { toast, type ToastManager } from "./toast-manager.js";

	let {
		toastManager = toast,
		timeout = 5000,
		limit = 3,
		class: className,
		...restProps
	}: Omit<
		ToasterProps,
		| "id"
		| "position"
		| "duration"
		| "visibleToasts"
		| "toastOptions"
		| "gap"
		| "offset"
		| "mobileOffset"
		| "hotkey"
	> & {
		toastManager?: ToastManager;
		timeout?: number;
		limit?: number;
	} = $props();
</script>

<Sonner
	id={toastManager.toasterId}
	data-slot="toast-viewport"
	class={cn("base-toast-viewport", className)}
	position="bottom-right"
	duration={timeout === 0 ? Infinity : timeout}
	visibleToasts={limit}
	gap={12}
	offset={16}
	mobileOffset={16}
	hotkey={["F6"]}
	pauseWhenPageIsHidden
	toastOptions={{ unstyled: true }}
	{...restProps}
/>
