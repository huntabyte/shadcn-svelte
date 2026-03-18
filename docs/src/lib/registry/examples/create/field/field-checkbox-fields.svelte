<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
</script>

<Example title="Checkbox Fields">
	<Field.Group>
		<Field.Field orientation="horizontal">
			<Checkbox id="checkbox-basic" checked />
			<Field.Label for="checkbox-basic" class="font-normal">
				I agree to the terms and conditions
			</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Label for="checkbox-right">Accept terms and conditions</Field.Label>
			<Checkbox id="checkbox-right" />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Checkbox id="checkbox-with-desc" />
			<Field.Content>
				<Field.Label for="checkbox-with-desc">Subscribe to newsletter</Field.Label>
				<Field.Description>
					Receive weekly updates about new features and promotions.
				</Field.Description>
			</Field.Content>
		</Field.Field>
		<Field.Label for="checkbox-with-title">
			<Field.Field orientation="horizontal">
				<Checkbox id="checkbox-with-title" />
				<Field.Content>
					<Field.Title>Enable Touch ID</Field.Title>
					<Field.Description
						>Enable Touch ID to quickly unlock your device.</Field.Description
					>
				</Field.Content>
			</Field.Field>
		</Field.Label>
		<Field.Set>
			<Field.Legend variant="label">Preferences</Field.Legend>
			<Field.Description
				>Select all that apply to customize your experience.</Field.Description
			>
			<Field.Group class="gap-3">
				<Field.Field orientation="horizontal">
					<Checkbox id="pref-dark" />
					<Field.Label for="pref-dark" class="font-normal">Dark mode</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<Checkbox id="pref-compact" />
					<Field.Label for="pref-compact" class="font-normal">Compact view</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<Checkbox id="pref-notifications" />
					<Field.Label for="pref-notifications" class="font-normal">
						Enable notifications
					</Field.Label>
				</Field.Field>
			</Field.Group>
		</Field.Set>
		<Field.Field data-invalid orientation="horizontal">
			<Checkbox id="checkbox-invalid" aria-invalid />
			<Field.Label for="checkbox-invalid" class="font-normal">Invalid checkbox</Field.Label>
		</Field.Field>
		<Field.Field data-disabled orientation="horizontal">
			<Checkbox id="checkbox-disabled-field" disabled />
			<Field.Label for="checkbox-disabled-field" class="font-normal">
				Disabled checkbox
			</Field.Label>
		</Field.Field>
	</Field.Group>
</Example>
