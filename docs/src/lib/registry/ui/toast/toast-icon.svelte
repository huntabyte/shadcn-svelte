<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ToastType } from "./toast-manager.js";
	let { type }: { type?: ToastType } = $props();
</script>

{#if type && ["success", "info", "warning", "error", "loading"].includes(type)}
	<span
		data-slot="toast-icon"
		class="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
	>
		{#if type === "success"}
			<IconPlaceholder
				lucide="CircleCheckIcon"
				tabler="IconCircleCheck"
				hugeicons="CheckmarkCircle02Icon"
				phosphor="CheckCircleIcon"
				remixicon="RiCheckboxCircleLine"
				aria-hidden="true"
			/>
		{:else if type === "info"}
			<IconPlaceholder
				lucide="InfoIcon"
				tabler="IconInfoCircle"
				hugeicons="InformationCircleIcon"
				phosphor="InfoIcon"
				remixicon="RiInformationLine"
				aria-hidden="true"
			/>
		{:else if type === "warning"}
			<IconPlaceholder
				lucide="TriangleAlertIcon"
				tabler="IconAlertTriangle"
				hugeicons="Alert02Icon"
				phosphor="WarningIcon"
				remixicon="RiErrorWarningLine"
				aria-hidden="true"
			/>
		{:else if type === "error"}
			<IconPlaceholder
				lucide="OctagonXIcon"
				tabler="IconAlertOctagon"
				hugeicons="MultiplicationSignCircleIcon"
				phosphor="XCircleIcon"
				remixicon="RiCloseCircleLine"
				class="text-destructive"
				aria-hidden="true"
			/>
		{:else if type === "loading"}
			<IconPlaceholder
				lucide="Loader2Icon"
				tabler="IconLoader"
				hugeicons="Loading03Icon"
				phosphor="SpinnerIcon"
				remixicon="RiLoaderLine"
				class="animate-spin motion-reduce:animate-none"
				aria-hidden="true"
			/>
		{/if}
	</span>
{/if}
