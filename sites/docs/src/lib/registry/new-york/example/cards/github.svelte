<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import Circle from "@lucide/svelte/icons/circle";
	import Plus from "@lucide/svelte/icons/plus";
	import Star from "@lucide/svelte/icons/star";
	import { Button, buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";

	let futureIdeas = $state(true);
	let myStack = $state(false);
	let inspiration = $state(false);
</script>

<Card.Root>
	<Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
		<div class="space-y-1">
			<Card.Title>shadcn/ui</Card.Title>
			<Card.Description>
				Beautifully designed components built with Radix UI and Tailwind CSS.
			</Card.Description>
		</div>
		<div class="bg-secondary text-secondary-foreground flex items-center space-x-1 rounded-md">
			<Button variant="secondary" class="px-3 shadow-none">
				<Star />
				Star
			</Button>
			<Separator orientation="vertical" class="h-[20px]" />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class={buttonVariants({ variant: "secondary", class: "px-2 shadow-none" })}
				>
					<ChevronDown class="text-secondary-foreground" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-[200px]" align="end">
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>Suggested Lists</DropdownMenu.GroupHeading>
						<DropdownMenu.Separator />
						<DropdownMenu.CheckboxItem bind:checked={futureIdeas}>
							Future Ideas
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem bind:checked={myStack}>
							My Stack
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem bind:checked={inspiration}>
							Inspiration
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<Plus /> Create List
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="text-muted-foreground flex space-x-4 text-sm">
			<div class="flex items-center">
				<Circle class="mr-1 size-3 fill-sky-400 text-sky-400" />
				TypeScript
			</div>
			<div class="flex items-center">
				<Star class="mr-1 size-3" />
				20k
			</div>
			<div>Updated April 2023</div>
		</div>
	</Card.Content>
</Card.Root>
