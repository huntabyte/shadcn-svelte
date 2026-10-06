<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import ToastIcon from "./toast-icon.svelte";
	import type { ToastItem } from "./toast-manager.js";

	let { item, close }: { item: ToastItem; close: () => void } = $props();
	const titleId = $props.id();
	const descriptionId = `${titleId}-description`;
</script>

<div
	data-slot="toast"
	data-type={item.type}
	class="cn-toast group/toast h-full w-full border bg-popover text-popover-foreground shadow-lg outline-none select-none"
>
	<div data-slot="toast-content" class="flex h-full items-center gap-3 overflow-hidden p-4">
		<ToastIcon type={item.type} />
		<div class="flex min-w-0 flex-1 flex-col gap-1">
			{#if item.title}
				<h2 id={titleId} data-slot="toast-title" class="text-sm font-medium">{item.title}</h2>
			{/if}
			{#if item.description}
				<p id={descriptionId} data-slot="toast-description" class="text-sm text-muted-foreground">
					{item.description}
				</p>
			{/if}
		</div>
		{#if item.actionProps}
			{@const { children, ...actionProps } = item.actionProps}
			<button
				type="button"
				{...actionProps}
				data-slot="toast-action"
				class={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"shrink-0",
					actionProps.class
				)}>{children}</button
			>
		{/if}
		<Button
			variant="ghost"
			size="icon-sm"
			data-slot="toast-close"
			aria-label="Close toast"
			class="relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground"
			onclick={close}
		>
			<IconPlaceholder
				lucide="XIcon"
				tabler="IconX"
				hugeicons="Cancel01Icon"
				phosphor="XIcon"
				remixicon="RiCloseLine"
				aria-hidden="true"
			/>
		</Button>
	</div>
</div>
