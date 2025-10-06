<script lang="ts">
	import ArchiveIcon from "@lucide/svelte/icons/archive";
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import CalendarPlusIcon from "@lucide/svelte/icons/calendar-plus";
	import ClockIcon from "@lucide/svelte/icons/clock";
	import ListFilterIcon from "@lucide/svelte/icons/list-filter";
	import MailCheckIcon from "@lucide/svelte/icons/mail-check";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import TagIcon from "@lucide/svelte/icons/tag";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";

	let label = $state("personal");
</script>

<ButtonGroup.Root>
	<ButtonGroup.Root class="hidden sm:flex">
		<Button variant="outline" size="icon" aria-label="Go Back">
			<ArrowLeftIcon />
		</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button variant="outline">Archive</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button variant="outline">Snooze</Button>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" size="icon" aria-label="More Options" {...props}>
						<MoreHorizontalIcon />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" class="w-52">
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<MailCheckIcon />
						Mark as Read
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<ArchiveIcon />
						Archive
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<ClockIcon />
						Snooze
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CalendarPlusIcon />
						Add to Calendar
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<ListFilterIcon />
						Add to List
					</DropdownMenu.Item>
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>
							<TagIcon />
							Label As...
						</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							<DropdownMenu.RadioGroup bind:value={label}>
								<DropdownMenu.RadioItem value="personal">
									Personal
								</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="work">Work</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="other">Other</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item variant="destructive">
						<Trash2Icon />
						Trash
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</ButtonGroup.Root>
</ButtonGroup.Root>
