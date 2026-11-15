<script lang="ts">
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";

	const usage = {
		input: 8420,
		output: 1260,
		reasoning: 980,
		limit: 128000,
	};

	const used = usage.input + usage.output + usage.reasoning;
	const percent = Math.round((used / usage.limit) * 100);

	function formatTokens(value: number) {
		if (value < 1000) {
			return String(value);
		}

		return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
	}

	const rows = [
		{ label: "Input", value: usage.input },
		{ label: "Output", value: usage.output },
		{ label: "Reasoning", value: usage.reasoning },
	];
</script>

<div class="flex justify-center py-12">
	<HoverCard.Root openDelay={10} closeDelay={100}>
		<HoverCard.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="sm">
					{percent}% context
				</Button>
			{/snippet}
		</HoverCard.Trigger>
		<HoverCard.Content class="flex w-64 flex-col gap-3">
			<div class="flex items-center justify-between gap-3 text-sm">
				<span class="font-medium">Context</span>
				<span class="text-muted-foreground">
					{formatTokens(used)} / {formatTokens(usage.limit)}
				</span>
			</div>
			<Progress value={percent} aria-label="Context used" />
			<div class="flex flex-col gap-1 text-sm">
				{#each rows as row (row.label)}
					<div class="flex justify-between gap-3">
						<span class="text-muted-foreground">{row.label}</span>
						<span>{formatTokens(row.value)}</span>
					</div>
				{/each}
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
</div>
