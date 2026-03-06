<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Input Types">
	<div class="flex w-full flex-col gap-6">
		<Field.Field>
			<Field.Label for="input-demo-password">Password</Field.Label>
			<Input.Root id="input-demo-password" type="password" placeholder="Password" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-tel">Phone</Field.Label>
			<Input.Root id="input-demo-tel" type="tel" placeholder="+1 (555) 123-4567" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-url">URL</Field.Label>
			<Input.Root id="input-demo-url" type="url" placeholder="https://example.com" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-search">Search</Field.Label>
			<Input.Root id="input-demo-search" type="search" placeholder="Search" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-number">Number</Field.Label>
			<Input.Root id="input-demo-number" type="number" placeholder="123" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-date">Date</Field.Label>
			<Input.Root id="input-demo-date" type="date" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-time">Time</Field.Label>
			<Input.Root id="input-demo-time" type="time" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-demo-file">File</Field.Label>
			<Input.Root id="input-demo-file" type="file" />
		</Field.Field>
	</div>
</Example>
