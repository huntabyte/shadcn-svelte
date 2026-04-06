<script lang="ts">
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";

	const people = [
		{
			username: "shadcn",
			avatar: "https://github.com/shadcn.png",
			email: "shadcn@vercel.com",
		},
		{
			username: "maxleiter",
			avatar: "https://github.com/maxleiter.png",
			email: "maxleiter@vercel.com",
		},
		{
			username: "evilrabbit",
			avatar: "https://github.com/evilrabbit.png",
			email: "evilrabbit@vercel.com",
		},
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">
				Select <ChevronDownIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-max" align="end">
		<DropdownMenu.Group>
			{#each people as person (person.username)}
				<DropdownMenu.Item textValue={person.username}>
					<Item.Root size="xs" class="w-full p-2">
						<Item.Media>
							<Avatar.Root class="size-[--spacing(6.5)]">
								<Avatar.Image src={person.avatar} class="grayscale" />
								<Avatar.Fallback>{person.username.charAt(0)}</Avatar.Fallback>
							</Avatar.Root>
						</Item.Media>
						<Item.Content class="gap-0">
							<Item.Title>{person.username}</Item.Title>
							<Item.Description class="leading-none">
								{person.email}
							</Item.Description>
						</Item.Content>
					</Item.Root>
				</DropdownMenu.Item>{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
