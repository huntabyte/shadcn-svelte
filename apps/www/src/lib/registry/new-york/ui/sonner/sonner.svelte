<script lang="ts">
	import AlertTriangle from "lucide-svelte/icons/triangle-alert";
	import Check from "lucide-svelte/icons/check";
	import Info from "lucide-svelte/icons/info";
	import Loader from "lucide-svelte/icons/loader";
	import CircleX from "lucide-svelte/icons/circle-x";
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";

	type $$Props = SonnerProps;
</script>

<Sonner
	theme={$mode}
	class="toaster group"
	toastOptions={{
		classes: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
		},
	}}
	{...$$restProps}
>
	<slot slot="loading-icon" name="loading-icon"><Loader class="animate-spin" /></slot>
	<slot slot="success-icon" name="success-icon"><Check /></slot>
	<slot slot="error-icon" name="error-icon"><CircleX /></slot>
	<slot slot="warning-icon" name="warning-icon"><AlertTriangle /></slot>
	<slot slot="info-icon" name="info-icon"><Info /></slot>
</Sonner>
