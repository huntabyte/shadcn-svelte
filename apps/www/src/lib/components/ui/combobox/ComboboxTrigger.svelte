<script lang="ts">
	import { Button } from "$components/ui/button";
	import { Popover } from "$components/ui/popover";
	import { ChevronsUpDown } from "lucide-svelte";
	import { ctx, melt } from ".";

	const inputValue = ctx.getInputValue();
</script>

<Popover.Trigger let:trigger asChild>
	<Button builders={[trigger]} variant="outline" role="combobox">
		{#if $inputValue}
			{$inputValue}
		{:else}
			<slot />
		{/if}
		<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
	</Button>
</Popover.Trigger>
