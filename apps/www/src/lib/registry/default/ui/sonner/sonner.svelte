<script lang="ts">
	import { mode } from "mode-watcher";
	import {
		Icon,
		Loader,
		Toaster as Sonner,
		type ToasterProps as SonnerProps,
	} from "svelte-sonner";

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
	<slot slot="loading-icon" name="loading-icon"><Loader visible={true} /></slot>
	<slot slot="success-icon" name="success-icon"><Icon type="success" /></slot>
	<slot slot="error-icon" name="error-icon"><Icon type="error" /></slot>
	<slot slot="warning-icon" name="warning-icon"><Icon type="warning" /></slot>
	<slot slot="info-icon" name="info-icon"><Icon type="info" /></slot>
</Sonner>
