<script lang="ts">
	import ComponentWrapper from "$lib/components/component-wrapper.svelte";
	import * as Charts from "./charts.js";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
</script>

<div class="flex flex-col gap-4 p-4">
	<Alert.Root
		class="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200"
	>
		<TriangleAlertIcon />
		<Alert.Title>Experimental - Use at Your Own Risk</Alert.Title>
		<Alert.Description class="text-foreground/90">
			<span>
				LayerChart v2 is still in pre-release (@next) and is actively evolving. Only use if
				you're comfortable with potential breaking changes before stable v2.
			</span><span>
				Current development status can be tracked <a
					href="https://github.com/techniq/layerchart/pull/449"
					class="inline underline hover:text-yellow-900 dark:hover:text-yellow-100"
					>here</a
				>.
			</span>
		</Alert.Description>
	</Alert.Root>

	<div class="grid flex-1 grid-cols-1 items-start gap-4 2xl:grid-cols-4">
		{#each Object.entries(Charts).sort() as [key, Component] (key)}
			<ComponentWrapper
				name={key}
				class="**:data-[slot=card]:w-full w-auto 2xl:data-[name=chartareainteractive]:col-span-3 2xl:data-[name=chartbarinteractive]:col-span-3 2xl:data-[name=chartlineinteractive]:col-span-3"
			>
				<Component />
			</ComponentWrapper>
		{/each}
	</div>
</div>
