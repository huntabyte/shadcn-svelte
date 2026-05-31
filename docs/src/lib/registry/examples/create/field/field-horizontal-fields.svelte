<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Textarea from "$lib/registry/ui/textarea/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";

	const basicItems = [
		{ label: "Select a fruit", value: undefined },
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Orange", value: "orange" },
	];

	let fruitValue = $state<string | undefined>(undefined);
	const fruitLabel = $derived(
		basicItems.find((item) => item.value === fruitValue)?.label ?? "Select a fruit"
	);
</script>

<Example title="Horizontal Fields">
	<Field.Group class="**:data-[slot=field-content]:min-w-48">
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="horizontal-input">Username</Field.Label>
				<Field.Description>Enter your preferred username.</Field.Description>
			</Field.Content>
			<Input.Root id="horizontal-input" placeholder="johndoe" />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="horizontal-textarea">Bio</Field.Label>
				<Field.Description>Write a short description about yourself.</Field.Description>
			</Field.Content>
			<Textarea.Root id="horizontal-textarea" placeholder="Tell us about yourself..." />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="horizontal-switch">Email Notifications</Field.Label>
				<Field.Description>Receive email updates about your account.</Field.Description>
			</Field.Content>
			<Switch id="horizontal-switch" />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="horizontal-select">Favorite Fruit</Field.Label>
				<Field.Description>Choose your favorite fruit.</Field.Description>
			</Field.Content>
			<Select.Root type="single" bind:value={fruitValue}>
				<Select.Trigger id="horizontal-select">{fruitLabel}</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each basicItems.filter((i) => i.value !== undefined) as item (item.value)}
							<Select.Item value={item.value!}>{item.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="horizontal-native-select">Country</Field.Label>
				<Field.Description>Select your country.</Field.Description>
			</Field.Content>
			<NativeSelect.Root id="horizontal-native-select">
				<NativeSelect.Option value="">Select a country</NativeSelect.Option>
				<NativeSelect.Option value="us">United States</NativeSelect.Option>
				<NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
				<NativeSelect.Option value="ca">Canada</NativeSelect.Option>
			</NativeSelect.Root>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="horizontal-slider">Volume</Field.Label>
				<Field.Description>Adjust the volume level.</Field.Description>
			</Field.Content>
			<Slider type="single" id="horizontal-slider" value={50} max={100} />
		</Field.Field>
	</Field.Group>
</Example>
