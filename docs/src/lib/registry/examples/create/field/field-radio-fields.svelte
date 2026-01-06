<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
</script>

<Example title="Radio Fields">
	<Field.Group>
		<Field.Set>
			<Field.Legend variant="label">Subscription Plan</Field.Legend>
			<RadioGroup.Root value="free">
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="free" id="radio-free" />
					<Field.Label for="radio-free" class="font-normal">Free Plan</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="pro" id="radio-pro" />
					<Field.Label for="radio-pro" class="font-normal">Pro Plan</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="enterprise" id="radio-enterprise" />
					<Field.Label for="radio-enterprise" class="font-normal">Enterprise</Field.Label>
				</Field.Field>
			</RadioGroup.Root>
		</Field.Set>
		<Field.Set>
			<Field.Legend variant="label">Battery Level</Field.Legend>
			<Field.Description>Choose your preferred battery level.</Field.Description>
			<RadioGroup.Root>
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="high" id="battery-high" />
					<Field.Label for="battery-high">High</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="medium" id="battery-medium" />
					<Field.Label for="battery-medium">Medium</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="low" id="battery-low" />
					<Field.Label for="battery-low">Low</Field.Label>
				</Field.Field>
			</RadioGroup.Root>
		</Field.Set>
		<RadioGroup.Root class="gap-6">
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="option1" id="radio-content-1" />
				<Field.Content>
					<Field.Label for="radio-content-1">Enable Touch ID</Field.Label>
					<Field.Description
						>Enable Touch ID to quickly unlock your device.</Field.Description
					>
				</Field.Content>
			</Field.Field>
			<Field.Field orientation="horizontal">
				<RadioGroup.Item value="option2" id="radio-content-2" />
				<Field.Content>
					<Field.Label for="radio-content-2">
						Enable Touch ID and Face ID to make it even faster to unlock your device.
						This is a long label to test the layout.
					</Field.Label>
					<Field.Description
						>Enable Touch ID to quickly unlock your device.</Field.Description
					>
				</Field.Content>
			</Field.Field>
		</RadioGroup.Root>
		<RadioGroup.Root class="gap-3">
			<Field.Label for="radio-title-1">
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="title1" id="radio-title-1" />
					<Field.Content>
						<Field.Title>Enable Touch ID</Field.Title>
						<Field.Description
							>Enable Touch ID to quickly unlock your device.</Field.Description
						>
					</Field.Content>
				</Field.Field>
			</Field.Label>
			<Field.Label for="radio-title-2">
				<Field.Field orientation="horizontal">
					<RadioGroup.Item value="title2" id="radio-title-2" />
					<Field.Content>
						<Field.Title>
							Enable Touch ID and Face ID to make it even faster to unlock your
							device. This is a long label to test the layout.
						</Field.Title>
						<Field.Description
							>Enable Touch ID to quickly unlock your device.</Field.Description
						>
					</Field.Content>
				</Field.Field>
			</Field.Label>
		</RadioGroup.Root>
		<Field.Set>
			<Field.Legend variant="label">Invalid Radio Group</Field.Legend>
			<RadioGroup.Root>
				<Field.Field data-invalid orientation="horizontal">
					<RadioGroup.Item value="invalid1" id="radio-invalid-1" aria-invalid />
					<Field.Label for="radio-invalid-1">Invalid Option 1</Field.Label>
				</Field.Field>
				<Field.Field data-invalid orientation="horizontal">
					<RadioGroup.Item value="invalid2" id="radio-invalid-2" aria-invalid />
					<Field.Label for="radio-invalid-2">Invalid Option 2</Field.Label>
				</Field.Field>
			</RadioGroup.Root>
		</Field.Set>
		<Field.Set>
			<Field.Legend variant="label">Disabled Radio Group</Field.Legend>
			<RadioGroup.Root disabled>
				<Field.Field data-disabled orientation="horizontal">
					<RadioGroup.Item value="disabled1" id="radio-disabled-1" disabled />
					<Field.Label for="radio-disabled-1">Disabled Option 1</Field.Label>
				</Field.Field>
				<Field.Field data-disabled orientation="horizontal">
					<RadioGroup.Item value="disabled2" id="radio-disabled-2" disabled />
					<Field.Label for="radio-disabled-2">Disabled Option 2</Field.Label>
				</Field.Field>
			</RadioGroup.Root>
		</Field.Set>
	</Field.Group>
</Example>
