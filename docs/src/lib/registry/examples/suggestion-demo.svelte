<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const suggestions = [
		"Add a dark mode toggle",
		"Fix the failing build",
		"Write tests for the form",
		"Upgrade to Next.js 16",
		"Add a loading state",
		"Find unused dependencies",
	];

	const replies: Record<string, string> = {
		"Add a dark mode toggle":
			"Added a ModeToggle to the site header. It calls setTheme from next-themes.",
		"Fix the failing build":
			"The build failed on a missing import in app/page.tsx. I added it and the build passes.",
		"Write tests for the form":
			"Added four tests in signup-form.test.tsx. They cover the empty, invalid and valid states.",
		"Upgrade to Next.js 16":
			"Ran the codemod and bumped next to 16. Two routes needed async params, so I updated them.",
		"Add a loading state":
			"Added a loading.tsx to the dashboard route. It shows skeletons while the data loads.",
		"Find unused dependencies":
			"Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?",
	};

	let text = $state("");
	let turn = $state<{ prompt: string; reply: string } | null>(null);
	let form = $state<HTMLFormElement | null>(null);
	const canSend = $derived(text.trim().length > 0);

	function send(prompt: string) {
		turn = {
			prompt,
			reply: replies[prompt] ?? "This demo only knows the suggestions. Pick one.",
		};
		text = "";
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!canSend) {
			return;
		}

		send(text.trim());
	}
</script>

<div class="mx-auto flex w-full max-w-lg flex-col gap-6 py-6 text-sm">
	{#if turn}
		<div class="flex flex-col gap-4">
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{turn.prompt}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
			<Message.Root>
				<Message.Content>
					<p>{turn.reply}</p>
				</Message.Content>
			</Message.Root>
		</div>
	{/if}
	<div class="flex flex-col gap-2">
		<div class="flex scroll-fade-x scrollbar-none gap-2 overflow-x-auto overscroll-x-contain">
			{#each suggestions as suggestion, index (index)}
				<Button variant="outline" size="sm" class="shrink-0" onclick={() => send(suggestion)}>
					{suggestion}
				</Button>
			{/each}
		</div>
		<form bind:this={form} onsubmit={onSubmit}>
			<InputGroup.Root>
				<InputGroup.Textarea
					bind:value={text}
					placeholder="Ask the agent to change your code..."
					onkeydown={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							form?.requestSubmit();
						}
					}}
					class="p-3"
				/>
				<InputGroup.Addon align="block-end">
					<InputGroup.Button
						size="icon-sm"
						variant="outline"
						class="rounded-full"
						aria-label="Attach files"
					>
						<PlusIcon />
					</InputGroup.Button>
					<InputGroup.Button
						type="submit"
						size="icon-sm"
						variant="default"
						class="ml-auto rounded-full"
						disabled={!canSend}
						aria-label="Send"
					>
						<ArrowUpIcon />
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</form>
	</div>
</div>
