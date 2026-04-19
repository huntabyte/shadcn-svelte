<script lang="ts">
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";

	type Stage = {
		id: string;
		label: string;
		description: string;
		dotClassName: string;
	};

	const STAGES: Stage[] = [
		{
			id: "drafting",
			label: "Drafting",
			description:
				"Start the writing process. Articles here are works in progress, visible only to editors and authors.",
			dotClassName: "bg-amber-600",
		},
		{
			id: "in-revision",
			label: "In Revision",
			description:
				"Content undergoing editorial review. Track changes and word counts as pieces take shape.",
			dotClassName: "bg-orange-700",
		},
		{
			id: "final-edit",
			label: "Final Edit",
			description:
				"The final polish before publication. Ensure all styling and factual checks are complete.",
			dotClassName: "bg-foreground",
		},
	];
</script>

<Card.Root class="py-24">
	<Card.Content class="flex flex-col items-center gap-10">
		<Empty.Root class="min-h-96">
			<Empty.Header>
				<Empty.Media
					variant="icon"
					class="bg-muted/70 text-muted-foreground size-14 rounded-full"
				>
					<FileTextIcon class="size-5" />
				</Empty.Media>
				<Empty.Title class="font-heading text-2xl tracking-normal normal-case">
					A Blank Canvas
				</Empty.Title>
				<Empty.Description>
					Your editorial directory is currently empty. Start building your publication's
					next issue by drafting the first piece.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>
					<PlusIcon data-icon="inline-start" />
					Create first article
				</Button>
			</Empty.Content>
		</Empty.Root>
		<Separator class="max-w-2xl" />
		<div class="grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
			{#each STAGES as stage (stage.id)}
				<div class="flex flex-col gap-2">
					<Badge>
						<span
							aria-hidden="true"
							class={`size-1.5 rounded-full ${stage.dotClassName}`}
						></span>
						{stage.label}
					</Badge>
					<p class="text-muted-foreground text-xs leading-relaxed">{stage.description}</p>
				</div>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
