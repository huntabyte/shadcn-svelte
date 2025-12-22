<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

    const currencyItems = [
        { label: "USD", value: "usd" },
        { label: "EUR", value: "eur" },
        { label: "GBP", value: "gbp" },
    ];

    let currency = $state(currencyItems[0].value);
    const currencyLabel = $derived(
        currencyItems.find((item) => item.value === currency)?.label ?? "USD"
    );
</script>

<Example title="With Select">
	<div class="flex w-full gap-2">
		<Input.Root type="text" placeholder="Enter amount" class="flex-1" />
		<Select.Root type="single" bind:value={currency}>
			<Select.Trigger class="w-32">
				{currencyLabel}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="usd">USD</Select.Item>
				<Select.Item value="eur">EUR</Select.Item>
				<Select.Item value="gbp">GBP</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
</Example>

