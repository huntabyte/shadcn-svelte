<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const currencyItems = [
		{ label: "$", value: "$" },
		{ label: "€", value: "€" },
		{ label: "£", value: "£" },
	];

	let currency = $state(currencyItems[0].value);
	const currencyLabel = $derived(
		currencyItems.find((item) => item.value === currency)?.label ?? "$"
	);
</script>

<Example title="With Select">
	<Field.Field>
		<Label for="amount">Amount</Label>
		<ButtonGroup>
			<Select.Root type="single" bind:value={currency}>
				<Select.Trigger>
					{currencyLabel}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each currencyItems as item (item.value)}
							<Select.Item value={item.value} label={item.label}>
								{item.label}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Input placeholder="Enter amount to send" />
			<Button variant="outline">
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight01Icon"
					phosphor="ArrowRightIcon"
					remixicon="RiArrowRightLine"
				/>
			</Button>
		</ButtonGroup>
	</Field.Field>
</Example>
