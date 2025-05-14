<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import CircleIcon from "@lucide/svelte/icons/circle";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import StarIcon from "@lucide/svelte/icons/star";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<Card.Root>
	<Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
		<div class="space-y-1">
			<Card.Title>shadcn-svelte</Card.Title>
			<Card.Description>
				Beautifully designed components built with Melt UI and Tailwind CSS.
			</Card.Description>
		</div>
		<div class="bg-secondary text-secondary-foreground flex items-center space-x-1 rounded-md">
			<Button variant="secondary" class="px-3 shadow-none">
				<StarIcon class="mr-2 size-4" />
				Star
			</Button>
			<Separator orientation="vertical" class="h-[20px]" />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class={buttonVariants({ variant: "secondary", class: "px-2 shadow-none" })}
				>
					<ChevronDownIcon class="text-secondary-foreground size-4" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-[200px]" align="end">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Suggested Lists</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.CheckboxItem checked>Future Ideas</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>My Stack</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem>Inspiration</DropdownMenu.CheckboxItem>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<PlusIcon class="mr-2 size-4" /> Create List
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="text-muted-foreground flex space-x-4 text-sm">
			<div class="flex items-center">
				<CircleIcon class="mr-1 size-3 fill-sky-400 text-sky-400" />
				TypeScript
			</div>
			<div class="flex items-center">
				<StarIcon class="mr-1 size-3" />
				1k
			</div>
			<div>Updated April 2023</div>
		</div>
	</Card.Content>
</Card.Root>
