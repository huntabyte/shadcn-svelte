<script lang="ts">
	import ArrowDown from "svelte-radix/ArrowDown.svelte";
	import ArrowUp from "svelte-radix/ArrowUp.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import { cn } from "@/utils";
	import { Button } from "@/registry/new-york/ui/button";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let props: {
		select: never;
		sort: {
			order: "desc" | "asc" | undefined;
			toggle: (event: Event) => void;
			clear: () => void;
			disabled: boolean;
		};
		filter: never;
	};

	function handleAscSort(e: Event) {
		if (props.sort.order === "asc") {
			return;
		}
		props.sort.toggle(e);
	}

	function handleDescSort(e: Event) {
		if (props.sort.order === "desc") {
			return;
		}
		props.sort.toggle(e);
	}
</script>

{#if !props.sort.disabled}
	<div class={cn("flex items-center", className)}>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					class="-ml-3 h-8 data-[state=open]:bg-accent"
				>
					<slot />
					{#if props.sort.order === "desc"}
						<ArrowDown class="ml-2 h-4 w-4" />
					{:else if props.sort.order === "asc"}
						<ArrowUp class="ml-2 h-4 w-4" />
					{:else}
						<CaretSort class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<DropdownMenu.Item on:click={handleAscSort}>Asc</DropdownMenu.Item>
				<DropdownMenu.Item on:click={handleDescSort}>Desc</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{:else}
	<slot />
{/if}
