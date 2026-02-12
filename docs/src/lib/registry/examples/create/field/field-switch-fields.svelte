<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Example title="Switch Fields">
	<Field.Group>
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="switch-airplane">Airplane Mode</Field.Label>
				<Field.Description
					>Turn on airplane mode to disable all connections.</Field.Description
				>
			</Field.Content>
			<Switch id="switch-airplane" />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Field.Label for="switch-dark">Dark Mode</Field.Label>
			<Switch id="switch-dark" />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Switch id="switch-marketing" />
			<Field.Content>
				<Field.Label for="switch-marketing">Marketing Emails</Field.Label>
				<Field.Description>
					Receive emails about new products, features, and more.
				</Field.Description>
			</Field.Content>
		</Field.Field>
		<Field.Field>
			<Field.Label>Privacy Settings</Field.Label>
			<Field.Description>Manage your privacy preferences.</Field.Description>
			<Field.Field orientation="horizontal">
				<Switch id="switch-profile" checked />
				<Field.Content>
					<Field.Label for="switch-profile" class="font-normal">
						Make profile visible to others
					</Field.Label>
				</Field.Content>
			</Field.Field>
			<Field.Field orientation="horizontal">
				<Switch id="switch-email" />
				<Field.Content>
					<Field.Label for="switch-email" class="font-normal"
						>Show email on profile</Field.Label
					>
				</Field.Content>
			</Field.Field>
		</Field.Field>
		<Field.Field data-invalid orientation="horizontal">
			<Field.Content>
				<Field.Label for="switch-invalid">Invalid Switch</Field.Label>
				<Field.Description>This switch has validation errors.</Field.Description>
			</Field.Content>
			<Switch id="switch-invalid" aria-invalid />
		</Field.Field>
		<Field.Field data-disabled orientation="horizontal">
			<Field.Content>
				<Field.Label for="switch-disabled-field">Disabled Switch</Field.Label>
				<Field.Description>This switch is currently disabled.</Field.Description>
			</Field.Content>
			<Switch id="switch-disabled-field" disabled />
		</Field.Field>
	</Field.Group>
</Example>
