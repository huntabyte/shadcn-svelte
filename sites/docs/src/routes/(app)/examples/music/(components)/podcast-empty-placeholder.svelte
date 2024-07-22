<script lang="ts">
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
</script>

<div class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
	<div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			class="text-muted-foreground h-10 w-10"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="11" r="1" />
			<path
				d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0"
			/>
			<path d="M17 18.5a9 9 0 1 0-10 0" />
		</svg>

		<h3 class="mt-4 text-lg font-semibold">No episodes added</h3>
		<p class="text-muted-foreground mb-4 mt-2 text-sm">
			You have not added any podcasts. Add one below.
		</p>
		<Dialog.Root>
			<Dialog.Trigger asChild let:builder>
				<Button size="sm" builders={[builder]} class="relative">Add Podcast</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Add Podcast</Dialog.Title>
					<Dialog.Description>
						Copy and paste the podcast feed URL to import.
					</Dialog.Description>
				</Dialog.Header>
				<div class="grid gap-4 py-4">
					<div class="grid gap-2">
						<Label for="url">Podcast URL</Label>
						<Input id="url" placeholder="https://example.com/feed.xml" />
					</div>
				</div>
				<Dialog.Footer>
					<Button>Import Podcast</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</div>
