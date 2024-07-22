<script lang="ts">
	import { nanoid } from "nanoid";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { Switch } from "$lib/registry/new-york/ui/switch/index.js";

	const id = nanoid(5);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Cookie Settings</Card.Title>
		<Card.Description>Manage your cookie settings here.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="flex items-center justify-between space-x-4">
			<Label for="necessary-{id}" class="flex flex-col space-y-1">
				<span>Strictly Necessary</span>
				<span class="text-muted-foreground text-xs font-normal leading-snug">
					These cookies are essential in order to use the website and use its features.
				</span>
			</Label>
			<Switch id="necessary-{id}" checked aria-label="Necessary" />
		</div>
		<div class="flex items-center justify-between space-x-4">
			<Label for="functional-{id}" class="flex flex-col space-y-1">
				<span>Functional Cookies</span>
				<span class="text-muted-foreground text-xs font-normal leading-snug">
					These cookies allow the website to provide personalized functionality.
				</span>
			</Label>
			<Switch id="functional-{id}" aria-label="Functional" />
		</div>
		<div class="flex items-center justify-between space-x-4">
			<Label for="performance-{id}" class="flex flex-col space-y-1">
				<span>Performance Cookies</span>
				<span class="text-muted-foreground text-xs font-normal leading-snug">
					These cookies help to improve the performance of the website.
				</span>
			</Label>
			<Switch id="performance-{id}" aria-label="Performance" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button variant="outline" class="w-full">Save preferences</Button>
	</Card.Footer>
</Card.Root>
