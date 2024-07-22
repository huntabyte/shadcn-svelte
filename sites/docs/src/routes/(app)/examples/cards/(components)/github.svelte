<script lang="ts">
	import ChevronDown from "svelte-radix/ChevronDown.svelte";
	import Circle from "svelte-radix/Circle.svelte";
	import Plus from "svelte-radix/Plus.svelte";
	import Star from "svelte-radix/Star.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
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
				<Star class="mr-2 h-4 w-4" />
				Star
			</Button>
			<Separator orientation="vertical" class="h-[20px]" />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" class="px-2 shadow-none">
						<ChevronDown class="text-secondary-foreground h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-[200px]" align="end">
					<DropdownMenu.Label>Suggested Lists</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.CheckboxItem checked>Future Ideas</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>My Stack</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Inspiration</DropdownMenu.CheckboxItem>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<Plus class="mr-2 h-4 w-4" /> Create List
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="text-muted-foreground flex space-x-4 text-sm">
			<div class="flex items-center">
				<Circle class="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
				TypeScript
			</div>
			<div class="flex items-center">
				<Star class="mr-1 h-3 w-3" />
				20k
			</div>
			<div>Updated April 2023</div>
		</div>
	</Card.Content>
</Card.Root>
