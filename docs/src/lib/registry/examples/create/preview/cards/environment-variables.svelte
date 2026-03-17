<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const envVars = [
		{ key: "DATABASE_URL", masked: true },
		{ key: "NEXT_PUBLIC_API", masked: false },
		{ key: "STRIPE_SECRET", masked: true },
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Environment Variables</Card.Title>
		<Card.Description>Production · 8 variables</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		{#each envVars as env, index (index)}
			<div
				class="ring-border flex items-center gap-2 rounded-md px-2.5 py-2 font-mono text-xs ring"
			>
				<span class="font-medium">{env.key}</span>
				<span class="text-muted-foreground ml-auto">
					{env.masked ? "••••••••" : "https://api.example.com"}
				</span>
			</div>
		{/each}
	</Card.Content>
	<Card.Footer>
		<Button variant="outline">Edit</Button>
		<Button class="ml-auto">Deploy</Button>
	</Card.Footer>
</Card.Root>
