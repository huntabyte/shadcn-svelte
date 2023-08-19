<script lang="ts">
	import * as Select from "@/registry/new-york/ui/select";
	import { config } from "@/stores";
	import { styles } from "@/registry/styles";

	let value = $config.style;
	$: config.update((prev) => ({ ...prev, style: value }));
</script>

<Select.Root bind:value>
	<Select.Trigger class="h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4">
		<span class="text-muted-foreground">Style: </span>
		<Select.Value placeholder="Select style" />
	</Select.Trigger>
	<Select.Content>
		{#each styles as style}
			<Select.Item value={style.name} label={style.label} class="text-xs">
				{style.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
