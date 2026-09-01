<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<div class="w-full max-w-sm">
	<Field.Group>
		<Field.Label for="switch-share">
			<Field.Field orientation="horizontal">
				<Field.Content>
					<Field.Title>Share across devices</Field.Title>
					<Field.Description>
						Focus is shared across devices, and turns off when you leave the app.
					</Field.Description>
				</Field.Content>
				<Switch id="switch-share" />
			</Field.Field>
		</Field.Label>
		<Field.Label for="switch-notifications">
			<Field.Field orientation="horizontal">
				<Field.Content>
					<Field.Title>Enable notifications</Field.Title>
					<Field.Description>
						Receive notifications when focus mode is enabled or disabled.
					</Field.Description>
				</Field.Content>
				<Switch id="switch-notifications" checked />
			</Field.Field>
		</Field.Label>
	</Field.Group>
</div>
