<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";

	const usernames = [
		"shadcn",
		"vercel",
		"nextjs",
		"tailwindlabs",
		"typescript-lang",
		"eslint",
		"prettier",
		"babel",
		"webpack",
		"rollup",
		"parcel",
		"vite",
		"react",
		"vue",
		"angular",
		"solid",
	];
</script>

<Example title="Contributors" class="items-center lg:p-16">
	<Card.Root class="max-w-sm">
		<Card.Header>
			<Card.Title>
				Contributors <Badge variant="secondary">312</Badge>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-wrap gap-2">
				{#each usernames as username (username)}
					<Avatar.Root>
						<Avatar.Image src={`https://github.com/${username}.png`} alt={username} />
						<Avatar.Fallback>{username.charAt(0)}</Avatar.Fallback>
					</Avatar.Root>
				{/each}
			</div>
		</Card.Content>
		<Card.Footer>
			<a href="#/" class="text-sm underline underline-offset-4"> + 810 contributors </a>
		</Card.Footer>
	</Card.Root>
</Example>
