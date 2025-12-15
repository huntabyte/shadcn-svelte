<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Cookie Settings</Card.Title>
		<Card.Description>Manage your cookie settings here.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<Field.Field orientation="horizontal">
			<Field.Content>
				<Field.Label for="necessary">Strictly Necessary</Field.Label>
				<Field.Description>
					These cookies are essential in order to use the website and use its features.
				</Field.Description>
			</Field.Content>
			<Switch id="necessary" checked aria-label="Necessary" />
		</Field.Field>
		<Field.Field>
			<Button variant="outline">Save preferences</Button>
		</Field.Field>
	</Card.Content>
</Card.Root>
